import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instructor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Instructor', // Reference to the Instructor model
      required: true
    },
    content: {
      lectureNotes: [{
        title: String,
        content: String
      }],
      videos: [{
        title: String,
        url: String
      }],
      quizzes: [{
        title: String,
        questions: [{
          question: String,
          options: [String],
          correctAnswer: String
        }]
      }]
    },
    enrollmentDetails: {
      capacity: {
        type: Number,
        default: 20 // Default capacity for the course
      },
      enrolledStudents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Learner' // Reference to the Learner model
      }]
    },
    paymentDetails: {
      price: {
        type: Number,
        required: true
      },
      paymentGateway: {
        type: String,
        required: true
      }
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending'
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
