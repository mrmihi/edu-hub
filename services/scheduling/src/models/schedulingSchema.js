const mongoose = require("mongoose");

const courseSession = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const day = new mongoose.Schema({
  monday: [courseSession],
  tuesday: [courseSession],
  wednesday: [courseSession],
  thursday: [courseSession],
  friday: [courseSession],
  saturday: [courseSession],
  sunday: [courseSession],
});

const schedulingSchema = new mongoose.Schema({
  timetable: [day],
  scheduleFor: {
    type: String,
    required: true,
    unique: true, //one schedule for one user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Scheduling", schedulingSchema);
