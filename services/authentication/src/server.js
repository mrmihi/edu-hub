const express = require('express');
const routes = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 2013;
const dbURL = process.env.MONGO_URL;
const authRoutes = require('./routes/authRoutes');
const expressHealth = require('express-healthcheck')

app.use('/system', expressHealth());
app.use(express.json());
app.use(cookieParser());
// Authentication routes
app.use('/api/v1/auth', authRoutes);

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
