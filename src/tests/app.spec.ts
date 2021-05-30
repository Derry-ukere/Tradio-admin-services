import request from 'supertest';

import app from '../app';

describe('Testing endpoints', function() {
  it('GET / - Should return 404', done => {
    request(app)
      .get('/')
      .expect(404, done);
  });

  it('GET /health - Should return 200 Ok', done => {
    request(app)
      .get('/health')
      .expect(200, done);
  });
});
