import express from 'express';
import Promise from 'bluebird';
import FB from 'fb';
import config from 'config';
import appConfigure from './environments/default';
import setRoutes from './routes';

FB.options(config.get('facebook'));

const app = express();
appConfigure(app);

app.use((req, res, next) => {
  if (req.session.access_token) {
    FB.options({ accessToken: req.session.access_token });
  }

  req.FB = Promise.promisifyAll(FB); // eslint-disable-line
  next();
});

setRoutes(app);

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();

  console.log(`App listens at http://${address}:${port}`);
});
