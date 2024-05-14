const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 2015;
const mongoose = require("mongoose");
const pdfRouter = require("./routes/reportGenerateRoute");
const dbURL = process.env.MONGO_URL;
const cookieParser = require('cookie-parser');
const expressHealth = require('express-healthcheck')

app.use('/system', expressHealth());
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/report', pdfRouter);

//mongodb connection
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
