import { Joi } from 'celebrate';

export const createCourseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructor: Joi.string().hex().length(24).required(), // Assuming instructor ID is a string with 24 hex characters
  type: Joi.string().valid('online', 'in-class', 'hybrid').default('online'), // Course type validation
  location: Joi.string().required(),
  content: Joi.object({
    lectureNotes: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        progress: Joi.number().integer().min(0).max(100).required(), // Include progress property with validation
      }),
    ),
    videos: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        url: Joi.string().uri().required(),
        progress: Joi.number().integer().min(0).max(100).required(), // Include progress property with validation
      }),
    ),
    quizzes: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        questions: Joi.array().items(
          Joi.object({
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string().required()).min(2).required(),
            correctAnswer: Joi.string().required(),
            progress: Joi.number().integer().min(0).max(100).required(), // Include progress property with validation
          }),
        ).required(),
      }),
    ),
  }),
  schedule: Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    days: Joi.array().items(Joi.string().valid(
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    )).required(),
    timings: Joi.object({
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    }).required(),
  }),
  enrollmentDetails: Joi.object({
    capacity: Joi.number().integer().min(1).required(),
    enrolledStudents: Joi.array().items(Joi.string().hex().length(24)).default([]),
  }),
  paymentDetails: Joi.object({
    price: Joi.number().positive().required(),
    paymentGateway: Joi.string().required(),
  }),
});

export const updateCourseSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  instructor: Joi.string().hex().length(24), // Assuming instructor ID is a string with 24 hex characters
  location: Joi.string().required(),
  content: Joi.object({
    lectureNotes: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      }),
    ),
    videos: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        url: Joi.string().uri().required(),
      }),
    ),
    quizzes: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        questions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              options: Joi.array().items(Joi.string().required()).min(2).required(),
              correctAnswer: Joi.string().required(),
            }),
          )
          .required(),
      }),
    ),
  }),
  enrollmentDetails: Joi.object({
    capacity: Joi.number().integer().min(1),
    enrolledStudents: Joi.array().items(Joi.string().hex().length(24)),
  }),
  paymentDetails: Joi.object({
    price: Joi.number().positive(),
    paymentGateway: Joi.string(),
  }),
  status: Joi.string().valid('pending', 'approved', 'cancelled'),
  createdAt: Joi.forbidden(), // Disallow updating the createdAt field
});
