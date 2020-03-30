import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('UI Server', () => {
  afterEach(() => {

  });
  it('GET / returns 404 ', async (done) => {
    const res = await request
      .get('/')
      .send();
    expect(res.status).toEqual(404);
    done();
  });
});
