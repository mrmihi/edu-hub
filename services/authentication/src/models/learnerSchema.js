const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  role: {
    type: String,
    default: 'learner',
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  nic: {
    type: String,
    required: [true, 'Please enter your NIC'],
    unique: true,
    lowercase: true,
  },
  contact: {
    type: Number,
    required: [true, 'Please enter your contact number'],
    unique: true,
    lowercase: true,
    minlength: [10, 'Minimum contact number length is 10 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  enrolledCourses: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Course',
  },
  progress: {
    type: Map,
    of: Number,
    min: 0,
    max: 100,
    default: {},
  },
});

// fire a function before doc saved to db
learnerSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login learner
learnerSchema.statics.login = async function (email, password) {
  const learner = await this.findOne({ email });
  if (learner) {
    const auth = await bcrypt.compare(password, learner.password);
    if (auth) {
      return learner;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

module.exports = mongoose.model('learner', learnerSchema);
