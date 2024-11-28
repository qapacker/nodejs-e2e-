const request = require('supertest');
const createApp = require('./../src/app');

describe('tests for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);

  });


  describe('at least one user created', () => {
    it('should have one user', async () => {
      const { statusCode, body } = await api.get(`/api/v1/users/`);
      expect(statusCode).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(1);

    });
  });


  afterEach(() => {
    server.close();
  });

});
