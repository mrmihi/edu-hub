const adminSchema = require("../models/adminSchema");
const instructorSchema = require("../models/instructorSchema");
const learnerSchema = require("../models/learnerSchema");
const jwt = require("jsonwebtoken");

//hanlde errors
handleErrors = (error) => {
  console.log(error.message, error.code);
  let errors = { name: "", email: "", password: "" };

  //incorrect email
  if (error.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  //incorrect password
  if (error.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  //duplicate error code
  if (error.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  //validation errors
  if (error.message.includes("validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//create tokens for different roles
const createTokenAdmin = (id) => {
  return jwt.sign({ id, role: "admin" }, "secret", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const createTokenInstructor = (id) => {
  return jwt.sign({ id, role: "instructor" }, "secret", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const createTokenLearner = (id) => {
  return jwt.sign({ id, role: "learner" }, "secret", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};


//api calls for signup, login and logout
module.exports.signup_post = async (req, res) => {
  try {
    const { role } = req.body;
    if (role === "admin") {
      const admin = await adminSchema.create(req.body);
      res.status(201).json({ admin: admin._id });
    } else if (role === "instructor") {
      const instructor = await instructorSchema.create(req.body);
      res.status(201).json({ instructor: instructor._id });
    } else if (role === "learner") {
      const learner = await learnerSchema.create(req.body);
      res.status(201).json({ learner: learner._id });
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role === "admin") {
      const admin = await adminSchema.login(email, password);
      const token = createTokenAdmin(admin._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token, admin: admin.name});
    } else if (role === "instructor") {
      const instructor = await instructorSchema.login(email, password);
      const token = createTokenInstructor(instructor._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token , instructor: instructor.name});
    } else if (role === "learner") {
      const learner = await learnerSchema.login(email, password);
      const token = createTokenLearner(learner._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({token , learner: learner.name});
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logged out");
};

module.exports.password_reset = async (req, res) => {
  const { email, newpassword ,role } = req.body;
  try{
    if(role === "admin"){
      const admin = await adminSchema.findOne({ email });
      if (!admin) {
        res.status(204).json({ message: "Admin not found" });
      }
      admin.password = newpassword;
      await admin.save();
      res.status(200).json({ message: "Password reset successful" });
    }else if(role === "instructor"){
      const vistor = await instructorSchema.findOne({ email });
      if (!vistor) {
        res.status(204).json({ message: "instructor not found" });
      }
      vistor.password = newpassword;
      await vistor.save();
      res.status(200).json({ message: "Password reset successful" });
    }else if(role === "learner"){
      const vistor = await learnerSchema.findOne({ email });
      if (!vistor) {
        res.status(204).json({ message: "learner not found" });
      }
      vistor.password = newpassword;
      await vistor.save();
      res.status(200).json({ message: "Password reset successful" });
    }
  }catch(error){
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }

};

//api call for authorization
module.exports.requireAuh = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");
      
      if (decoded.role === "admin") {
        const admin = await adminSchema.findById({ _id: decoded.id });
        req.admin = admin;
        next();
      } else if (decoded.role === "instructor") {
        const instructor = await instructorSchema.findById({ _id: decoded.id });
        req.instructor = instructor;
        next();
      } else if (decoded.role === "learner") {
        const learner = await learnerSchema.findById({ _id: decoded.id });
        req.learner = learner;
        next();
      }
    } catch (error) {
      console.log("error vertifying JWT token", error.message);
      res.send(401).json({ error: "Unauthorized" });
    }
  } else {
    res.send(401).json({ error: "Unauthorized" });
  }
};
