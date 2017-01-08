import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressHandlebar from 'express-handlebars';
import path from 'path';

const app = express();

// Set request body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Set cookie parser
app.use(cookieParser());

// Set template
const hbs = expressHandlebar({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main',
  extname: '.hbs'
});

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

app.use('/', (req, res) => {
  res.render('home');
});

const server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();

  console.log(`App listens at http://${address}:${port}`);
});
