import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import expressHandlebar from 'express-handlebars';
import path from 'path';

export default function (app) {
  // Set request body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../../public')));

  // Set cookie parser, session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));

  // Set template
  const hbs = expressHandlebar({
    layoutsDir: path.join(__dirname, '../views/layouts'),
    defaultLayout: 'main',
    extname: '.hbs'
  });

  app.set('views', path.join(__dirname, '../views'));
  app.engine('hbs', hbs);
  app.set('view engine', 'hbs');
}
