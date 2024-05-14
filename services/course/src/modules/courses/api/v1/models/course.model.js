import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['online', 'in-class', 'hybrid'],
      default: 'online',
    },
    location: {
      type:String,
      required: true
    },
    instructor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Instructor', // Reference to the Instructor model
      required: true,
    },
    content: {
      lectureNotes: [
        {
          title: String,
          content: String,
          Progress: Number
        },
      ],
      videos: [
        {
          title: String,
          url: String,
          Progress: Number
        },
      ],
      quizzes: [
        {
          title: String,
          questions: [
            {
              question: String,
              options: [String],
              correctAnswer: String,
              Progress: Number
            },
          ],
        },
      ],
    },
    schedule: {
startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      days: [
        {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        },
      ],
      timings: {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    },
    enrollmentDetails: {
      capacity: {
        type: Number,
        default: 20, // Default capacity for the course
      },
      enrolledStudents: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Learner', // Reference to the Learner model
        },
      ],
    },
    paymentDetails: {
      price: {
        type: Number,
        required: true,
      },
      paymentGateway: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

CourseSchema.index({ createdAt: 1 });

CourseSchema.plugin(aggregatePaginate);

const Course = mongoose.model('Course', CourseSchema);

Course.syncIndexes();

export { Course };
