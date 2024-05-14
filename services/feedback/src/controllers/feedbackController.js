const feedbackSchema = require("../models/feedbackSchema");
const adminSchema = require("../models/adminSchema");
const instructorSchema = require("../models/instructorSchema");
const learnerSchema = require("../models/learnerSchema");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    type: "",
    remarks: "",
    status: "",
  };

  //validation errors
  if (err.message.includes("Feedback validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.feedbackID = "Feedback ID already exists";
    return errors;
  }
  return errors;
};


//api call for authorization
module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");
      
      if (decoded.role === "admin") {
        const admin = await adminSchema.findById({ _id: decoded.id }); 
        req.admin = admin;
        next();
      } else if (decoded.role === "instructor") {
        const instructor = await instructorSchema.findById({ _id: decoded.id });
        req.instructor = instructor;
        next();
      } else if (decoded.role === "learner") {
        const learner = await learnerSchema.findById({ _id: decoded.id });
        req.learner = learner;
        next();
      }
    } catch (error) {
      console.log("error vertifying JWT token", error.message);
      res.send(401).json({ error: "Unauthorized" });
    }
  } else {
    res.send(401).json({ error: "Unauthorized" });
  }
};

//feedbackID Auto-generation
function generateFeedbackID() {
  let feedbackID = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    feedbackID += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return feedbackID;
}

//api calls
module.exports.createFeedback = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const learnerID = req.learner._id;
  const learneremail = req.learner.email; 
  console.log(learnerID);
  try {
    const learner = await learnerSchema.findOne({ _id: learnerID });
    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }
    const feedback = await feedbackSchema.create({
      feedbackID: generateFeedbackID(),
      type: req.body.type,
      remarks: req.body.remarks,
      status: "Pending",
      dateTime: new Date(),
      feedbackOwner: learneremail,
      feedbackReplier: "admin",
    });
    res.status(201).json({ feedback: feedback._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.updateFeedback = async (req, res) => {
  if (!req.admin || !req.admin._id) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const adminID = req.admin._id;
  const adminemail = req.admin.email;
  try {
    const admin = await adminSchema.findOne({ _id: adminID });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const feedback = await feedbackSchema.findOne({
      feedbackID: req.params.feedbackID,
    });
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    feedback.status = req.body.status;
    feedback.feedbackReplier = adminemail;
    const updatedFeedback = await feedback.save();
    res.status(200).json({ feedback: updatedFeedback._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.deleteFeedback = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const learnerID = req.learner._id;
  const learneremail = req.learner.email;
  try {
    const learner = await learnerSchema.findOne({ _id: learnerID });
    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }
    const feedback = await feedbackSchema.findOneAndDelete({
      feedbackID: req.params.feedbackID,
      feedbackOwner: learneremail,
    });
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ feedback: feedback._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.getAllFeedbacks = async (req, res) => {
  if (!req.admin || !req.admin._id) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const feedbacks = await feedbackSchema.find();
    res.status(200).json({ feedbacks });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.getFeedbackByLearner = async (req, res) => {
  if (!req.learner || !req.learner._id) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const learnerID = req.learner._id;
  const learneremail = req.learner.email;
  try {
    const learner = await learnerSchema.findOne({ _id: learnerID });
    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }
    const feedbacks = await feedbackSchema.find({ feedbackOwner: learneremail });
    res.status(200).json({ feedbacks });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}



