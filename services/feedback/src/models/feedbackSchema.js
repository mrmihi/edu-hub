const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackID: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  feedbackOwner: {
    type: String,
    required: true,
  },
  feedbackReplier: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("feedback", feedbackSchema);
