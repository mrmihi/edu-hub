const express = require('express');
const routes = express.Router();
const app = express();

const mongoose = require('mongoose');
const port = process.env.PORT || 2111;
const dbURL = process.env.MONGO_URL;
const authRoutes = require('./routes/authRoutes');
app.use(express.json());

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
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}/`);
});
