// tests/integration/posts.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Post = require('../../src/models/Post');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/posts', () => {
  it(
    'should create a new post',
    async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          title: 'Test Post',
          content: 'This is a test post.',
          category: '686acb4517efaf249a63becb', 
          author: '686acaae17efaf249a63bec9',   
          slug: 'test-post'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('title', 'Test Post');
    },
    30000 // timeout set to 30 seconds
  );
});
