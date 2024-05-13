const { text } = require("body-parser");
const nodemailer = require("nodemailer");

//create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
});

const mailOption = (email, subject, message) => ({
  from: {
    name: "EduHub",
    address: process.env.USERNAME,
  },
  to: email, // list of receivers
  subject: subject, // Subject line
  text: message, // plain text body
  html: message,
});

const sendMail = async (email, subject, message) => {
  try {
    await transporter.sendMail(mailOption(email, subject, message));
    console.log("Email has been sent");
  } catch (error) {
    console.error("Error sending mail: ", error);
  }
};

module.exports = { sendMail };