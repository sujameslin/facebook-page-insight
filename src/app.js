import express from 'express';
import appConfigure from './environments/default';

const app = express();

appConfigure(app);

app.use('/', (req, res) => {
  res.render('home');
});

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();

  console.log(`App listens at http://${address}:${port}`);
});
