const mongoose = require('mongoose');
const {isEmail} = require('validator');

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  role: {
    type: String,
    default: "learner",
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

});
