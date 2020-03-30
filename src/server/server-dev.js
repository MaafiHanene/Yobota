import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config';

import app, { HTML_FILE } from './server';

const compiler = webpack(config);

const createWebpackDevMiddleware = () => webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: compiler.publicPath,
  silent: true,
  stats: 'errors-only',
});


// eslint-disable-next-line no-shadow
const addWebpackHotMiddleWare = (app, middleware) => {
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    // eslint-disable-next-line no-console
    middleware.fileSystem.readFile(HTML_FILE, (err, file) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

// eslint-disable-next-line no-shadow
const addMiddleware = (app) => {
  const middleware = createWebpackDevMiddleware();
  app.use(middleware);
  addWebpackHotMiddleWare(app, middleware);
};

app.use(require('webpack-hot-middleware')(compiler));

addMiddleware(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to ${PORT}....`);
  // eslint-disable-next-line no-console
  console.log('Press Ctrl+C to quit');
});
