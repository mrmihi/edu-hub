const express = require("express");
const {
  updateProgress,
  cancelEnrollment,
  enrollInCourse,
  getEnrolledCourses,
  getAllProgress,
  requireAuth
} = require("../controllers/LearnerController");
const learnerRouter = express.Router();

learnerRouter.put("/course/:courseId/title/:titleId/progress",requireAuth,updateProgress);
learnerRouter.get("/course/:courseId", getAllProgress);
learnerRouter.delete("/cancel-enrollment/:courseId",requireAuth,cancelEnrollment);
learnerRouter.post("/enroll/:courseId",requireAuth, enrollInCourse);
learnerRouter.get("/courses", requireAuth ,getEnrolledCourses);

module.exports = learnerRouter;