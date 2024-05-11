const schedulingSchema = require("../models/schedulingSchema");
const learnerSchema = require("../models/learnerSchema");
const adminSchema = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

//handle errors
const handleErros = (err) => {
  console.log(err.message, err.code);
  let errors = {
    timetable: "",
    scheduleFor: "",
  };

  //validation errors
  if (err.message.includes("Scheduling validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
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

//api calls
module.exports.createSchedule = async (req, res) => {
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

    const schedule = await schedulingSchema.create({
      timetable: req.body.timetable,
      scheduleFor: learneremail,
    });
    res.status(201).json({ schedule: schedule._id });
  } catch (error) {
    const errors = handleErros(error);
    res.status(400).json({ errors });
  }
};

module.exports.updateSchedule = async (req, res) => {
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
    const schedule = await schedulingSchema.findOne({
      scheduleFor: learneremail,
    });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    schedule.timetable = req.body.timetable;
    await schedule.save();
    res.status(200).json({ schedule });
  } catch (error) {
    const errors = handleErros(error);
    res.status(400).json({ errors });
  }
};

module.exports.deleteSchedule = async (req, res) => {
  if (!req.admin || !req.admin._id) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const adminID = req.admin._id;
  try {
    const admin = await adminSchema.findOne({ _id: adminID });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const schedule = await schedulingSchema.findOneAndDelete({
      scheduleFor: req.params.email, 
    });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getSchedule = async (req, res) => {
  if (req.admin && req.admin._id) {
    console.log("admin");
  } else if (req.learner && req.learner._id) {
    console.log("learner");
  } else {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    if (req.admin && req.admin._id) {
      const admin = await adminSchema.findOne({ _id: req.admin._id });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const schedule = await schedulingSchema.findOne({
        scheduleFor: req.params.email,
      });
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({ schedule });
    } else {
      const learner = await learnerSchema.findOne({ _id: req.learner._id });
      if (!learner) {
        return res.status(404).json({ message: "Learner not found" });
      }
      const schedule = await schedulingSchema.findOne({
        scheduleFor: req.learner.email,
      });
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json({ schedule });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
