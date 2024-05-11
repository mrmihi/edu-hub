const express = require('express');
const routes = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 2012;
const dbURL = process.env.MONGO_URL;
const scheduleRoutes = require('./routes/schedulingRoutes');
const expressHealth = require('express-healthcheck')

app.use('/system', expressHealth());
app.use(cookieParser());
app.use(express.json());

// scheduling routes
app.use('/api/v1/schedule', scheduleRoutes);

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
