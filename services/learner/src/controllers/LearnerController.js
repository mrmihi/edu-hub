const Learner = require('../models/learnerSchema');
const Course = require('../models/courseSchema');
const sendSms = require('../controllers/notification/SmsController');
const { sendMail } = require('../controllers/notification/EmailController');
const jwt = require('jsonwebtoken');

//api call for authorization
module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret');

      if (decoded.role === 'admin') {
        const admin = await adminSchema.findById({ _id: decoded.id });
        req.admin = admin;
        next();
      } else if (decoded.role === 'instructor') {
        const instructor = await instructorSchema.findById({ _id: decoded.id });
        req.instructor = instructor;
        next();
      } else if (decoded.role === 'learner') {
        const learner = await Learner.findById({ _id: decoded.id });
        req.learner = learner;
        next();
      }
    } catch (error) {
      console.log('error vertifying JWT token', error.message);
      res.send(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.send(401).json({ error: 'Unauthorized' });
  }
};

//API to update the progress of a learner
module.exports.updateProgress = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }
  const learnerId = req.learner._id;
  const { courseId, titleId } = req.params;
  const { progress } = req.body;

  try {
    //find the course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ Error: 'Course not found ' });
    }

    // Ensure content exists and is an object with lectureNotes array
    if (!course.content || !Array.isArray(course.content.lectureNotes)) {
      return res.status(404).json({ Error: 'Course content or lecture notes not found' });
    }

    //find the lecture note
    const lectureNote = course.content.lectureNotes.find((note) => note._id == req.params.titleId);

    if (!lectureNote) {
      return res.status(404).json({ Error: 'Lecture note title not found ' });
    }

    //update the progress for the lecture note
    lectureNote.progress = progress;
    await course.save();
    res.json({ message: 'Progress updated successfully', course });
  } catch (error) {
    console.error('Error updating progress: ', error);
    res.status(500).json({ error: 'Failed to update the progress' });
  }
};

//API to get the progress
module.exports.getAllProgress = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    //find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ Error: 'Course not found ' });
    }

    const { content } = course;

    res.json(content.lectureNotes);
    // console.log(content.lectureNotes);
  } catch (error) {
    console.error('Error fetching progress: ', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

//API to cancel the course enrollment
module.exports.cancelEnrollment = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }
  const learnerId = req.learner._id;

  const courseId = req.params.courseId;

  try {
    const learner = await Learner.findById(learnerId);
    //const course = await Course.findById(courseId);

    if (!learner) {
      return res.status(404).json({ Error: 'Learner not found' });
    }

    const index = learner.enrolledCourses.findIndex((enrolledCourseId) => enrolledCourseId.toString() === courseId);

    if (index === -1) {
      return res.status(404).json({ error: 'Course not found in enrolled courses' });
    }

    //remove the course from the enrolledCourses array
    learner.enrolledCourses.splice(index, 1);
    await learner.save();

    res.json({ message: 'Course enrollment cancelled successfully!' });
  } catch (error) {
    console.error('Error cancelling enrollment: ', error);
    res.status(500).json({ error: 'Failed to cancel enrollment' });
  }
};

//API to enroll in courses
module.exports.enrollInCourse = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }
  const learnerId = req.learner._id;
  const courseId = req.params.courseId;

  console.log('learnerId', learnerId);
  console.log('courseId', courseId);

  try {
    const learner = await Learner.findById(learnerId);
    const course = await Course.findById(courseId);

    if (!learner) {
      return res.status(404).json({ Error: 'Learner not found' });
    }

    if (!course) {
      return res.status(404).json({ Error: 'Course not found' });
    }

    if (learner.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ Error: 'Learner already enrolled in this course' });
    }

    learner.enrolledCourses.push(courseId);
    await learner.save();

    //send an sms when enrollment is successfull
    sendSms(learner.learnerPhone, `You have successfully enrolled in course ${course.title}`);

    //send an email when enrollment is successfull
    sendMail(learner.learnerEmail, 'Course Enrollment Confirmation', `You have successfully enrolled in course ${course.title}`);

    res.json({ Message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Error in enrolling course: ', error);
    res.status(500).json({ Error: 'Failed to enroll in course' });
  }
};

//API to get enrolled courses
module.exports.getEnrolledCourses = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }
  const learnerId = req.learner._id;
  try {
    const learner = await Learner.findById(learnerId).populate('enrolledCourses');

    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }

    res.json({ enrolledCourses: learner.enrolledCourses });
  } catch (error) {
    console.error('Error fetching eenrolled courses: ', error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
};
