const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  role: {
    type: String,
    default: "instructor",
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// fire a function before doc saved to db
instructorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login instructor
instructorSchema.statics.login = async function (email, password) {
  const instructor = await this.findOne({ email });
  if (instructor) {
    const auth = await bcrypt.compare(password, instructor.password);
    if (auth) {
      return instructor;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("instructor", instructorSchema);

// {
//   "name" : "instructor1",
//   "role" :"instructor",
//   "email" : "instructor@gmail.com",
//   "password" : "123456"
// }