const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    lectureNotes: [
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
        },
        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
      },
    ],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
