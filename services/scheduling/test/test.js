const request = require('supertest');
const app = require('../yourApp'); // Import your Express app
const mongoose = require('mongoose');
const Schedule = require('../models/schedulingSchema');

describe('POST /schedule', () => {
  let token;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: 'learner@example.com', password: 'password', role: 'learner' });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    // Clean up after testing
    await mongoose.connection.close();
  });

  it('should create a new schedule', async () => {
    const response = await request(app)
      .post('/schedule')
      .set('Cookie', [`jwt=${token}`]) // Set the JWT token in the request headers
      .send({ timetable: 'Monday 9:00 AM - 5:00 PM' });

    expect(response.status).toBe(201);

    // Check if the schedule exists in the database
    const schedule = await Schedule.findOne({ timetable: 'Monday 9:00 AM - 5:00 PM' });
    expect(schedule).toBeTruthy();
  });

  it('should return 401 if user is not authenticated', async () => {
    const response = await request(app)
      .post('/schedule')
      .send({ timetable: 'Monday 9:00 AM - 5:00 PM' });

    expect(response.status).toBe(401);
  });

  it('should return 404 if learner is not found', async () => {
    const response = await request(app)
      .post('/schedule')
      .set('Cookie', [`jwt=${token}`])
      .send({ timetable: 'Monday 9:00 AM - 5:00 PM' });

    expect(response.status).toBe(404);
  });
});
