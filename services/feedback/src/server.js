const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 2011;
const dbURL = process.env.MONGO_URL;
const feedbackRoutes = require('./routes/feedbackRoutes');
const expressHealth = require('express-healthcheck')

app.use('/system', expressHealth());
app.use(cookieParser());
app.use(express.json());

// feedback routes
app.use('/api/v1/feedback', feedbackRoutes);

mongoose
.connect(dbURL)
.then(() =>{ console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
