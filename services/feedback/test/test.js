const request = require('supertest');
const app = require('../yourApp'); 
const mongoose = require('mongoose');
const Feedback = require('../models/feedbackSchema');

describe('POST /feedback', () => {
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

  it('should create a new feedback', async () => {
    const response = await request(app)
      .post('/feedback')
      .set('Cookie', [`jwt=${token}`]) // Set the JWT token in the request headers
      .send({ type: 'Improvement', remarks: 'This is a test feedback' });

    expect(response.status).toBe(201);

    // Check if the feedback exists in the database
    const feedback = await Feedback.findOne({ remarks: 'This is a test feedback' });
    expect(feedback).toBeTruthy();
  });

  it('should return 401 if user is not authenticated', async () => {
    const response = await request(app)
      .post('/feedback')
      .send({ type: 'Improvement', remarks: 'This is a test feedback' });

    expect(response.status).toBe(401);
  });

  it('should return 404 if learner is not found', async () => {
    const response = await request(app)
      .post('/feedback')
      .set('Cookie', [`jwt=${token}`])
      .send({ type: 'Improvement', remarks: 'This is a test feedback' });

    expect(response.status).toBe(404);
  });

});
