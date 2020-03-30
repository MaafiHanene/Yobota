import mockAxios from 'axios';
import supertest from 'supertest';
import app from '../../server';

const mockSearchData = {
  data: {
    count: 10,
    next: 'http://localhost:8001/api/search?page=2',
    previous: null,
    results: [
      {
        id: 1,
        title: 'PDF course one',
        image: 'https://i.imgur.com/SQHtA8V.jpg',
        type: 'pdf',
        url: 'https://www.iaaf.org/responsive/download/downloaddirect?filename=7f95d6fb-0666-49e0-b8b0-2bf488b2ffab.pdf&urlslug=IAAF%20Competition%20Rules%202018-2019%2C%20in%20force%20from%201%20November%202017%20',
      },
      {
        id: 2,
        title: 'PDF course two',
        image: 'https://i.imgur.com/SQHtA8V.jpg',
        type: 'pdf',
        url: 'https://www.iaaf.org/responsive/download/downloaddirect?filename=7f95d6fb-0666-49e0-b8b0-2bf488b2ffab.pdf&urlslug=IAAF%20Competition%20Rules%202018-2019%2C%20in%20force%20from%201%20November%202017%20',
      },
      {
        id: 3,
        title: 'Video course three',
        image: 'https://i.imgur.com/SQHtA8V.jpg',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=vxmFDyU82AQ',
      },
      {
        id: 4,
        title: 'PDF course quatre',
        image: 'https://i.imgur.com/SQHtA8V.jpg',
        type: 'pdf',
        url: 'https://www.iaaf.org/responsive/download/downloaddirect?filename=7f95d6fb-0666-49e0-b8b0-2bf488b2ffab.pdf&urlslug=IAAF%20Competition%20Rules%202018-2019%2C%20in%20force%20from%201%20November%202017%20',
      },
    ],
  },
};


const request = supertest(app);
describe('UI Server', () => {
  afterEach(() => {
  });
  it('GET /api search returns activities ', async (done) => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockSearchData));
    const query = {
      query: `
        query {
          search(text: "") {
            ... on Activity {
              id
            }
          }
        }
      `,
    };
    const res = await request
      .get('/api')
      .set('Accept', 'application/json')
      .send(query);
    expect(res.status).toEqual(200);
    expect(res.body.data.search).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: '1' }),
    ]));
    done();
  });
});
