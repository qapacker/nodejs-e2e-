const request = require('supertest');
const createApp = require('./../src/app');

describe('tests for app', () => {
  let app = null;
  let server = null;
  let api = null;
  let accessToken = null; // Almacenar el token de acceso para usarlo en las pruebas posteriores

  beforeEach(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);

    // Realizar el inicio de sesión y almacenar el token de acceso
    const response = await api.post('/api/v1/auth/login')
      .send({
        email: 'admin@mail.com',
        password: 'admin123'
      })
      .set('Content-Type', 'application/json');

    accessToken = response.body.access_token;
  });




  describe('at least one categorie', () => {
    it('should have one categorie', async () => {
      const { statusCode, body } = await api.get(`/api/v1/categories/`)
      .set('Authorization', `Bearer ${accessToken}`);
      const categoryNames = body.map(category => category.name);
      expect(statusCode).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(1);
      expect(categoryNames.includes('New Category')).toBe(true);

    });

  });

  describe('Login Endpoint', () => {
    it('should login successfully', async () => {
      expect(accessToken).toBeDefined(); // Asegurarse de que el token de acceso se ha obtenido correctamente
    });
  });

  afterEach(() => {
    server.close();
  });

});
