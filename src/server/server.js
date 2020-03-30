import path from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';


import { json } from 'body-parser';
import auth from './auth';
import schema from './schemas';

const app = express();
app.use(json());
let distDir = __dirname;
if (process.env.DIST_DIR !== undefined) {
  distDir = `${__dirname}${process.env.DIST_DIR}`;
}
export const HTML_FILE = path.join(distDir, 'index.html');

app.use(express.static(distDir));
app.use('/images', express.static(`${distDir}/images`));
app.use('/fonts', express.static(`${distDir}/fonts`));
app.use('/api/auth', auth);
const root = {
  token(request) {
    return request.headers.authorization;
  },
};
app.use(
  '/api',
  graphqlHTTP((request) => ({
    schema,
    rootValue: root,
    context: { token: request.headers.authorization },
    graphiql: true,
  })),
);

export default app;
