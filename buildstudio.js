/**
 *  Build studio.
 *
 *  @file      This file defines the app settings.
 *  @author    Eduardo Messias.
 */

/**
 *  @global
 *  @requires     express
 *  @description  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
 *  @see          https://expressjs.com
 */
const cookieSession = require ('cookie-session');
const express = require ('express');
const path = require ('path');

/**
 *  @global
 *  @description  Instance of the express object running for this application.
 */
const app = express ();

app.set ('trust proxy', 1);

app.use (cookieSession({ 
  name: 'session',
  keys: [process.env.SECRET]
}));

/**
 *  Set the one specifc directory as the folder to store the views.
 *  This line defines where the views (screens) will be stored in the project structure.
 */
app.set ('views', path.join (__dirname, 'views'));

/**
 *  Set the view engine used by the application.
 *  Hrp uses PUG (a.k.a. Jade) as the view engine.
 *  @see https://pugjs.org
 */
app.set ('view engine', 'pug');

/**
 *  Use log manager middleware.
 *  It writes a log file daily over the requisitions and help the application to manage the transit health status.
 */
const morgan = require ('morgan');
const rotatingFileStream = require ('rotating-file-stream');

const morganOptions = { interval: '1d', path: path.join (__dirname, 'log') };
const accessLogStream = rotatingFileStream ('access.log', morganOptions);

app.use (morgan ('combined', { stream: accessLogStream }));

/**
 *  Use cookie parser middleware.
 *  Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
 *  Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 */
app.use (require ('cookie-parser') ());

/**
 *  Use express json middleware.
 *  It parses incoming requests with JSON payloads and is based on body-parser.
 *  @see http://expressjs.com/en/api.html#express.json
 */
app.use (express.json ());

/**
 *  Use express url encoded middleware.
 *  It parses incoming requests with urlencoded payloads and is based on body-parser.
 *  @see http://expressjs.com/en/5x/api.html#express.urlencoded
 */
app.use (express.urlencoded ({ extended: false }));

/**
 *  Use express static middleware.
 *  It serves static files and is based on serve-static.
 *  @see http://expressjs.com/en/5x/api.html#express.static
 */
app.use (express.static (path.join (__dirname, 'public')));

/**
 * Body parser
 */
const bodyParser = require ('body-parser');
app.use (bodyParser.json ());

/**
 *  Use the application route manager.
 *  It requires the component routes and enable them for request.
 */
app.use ('/', require ('./components/document-design/router'));

/**
 *  Use http errors middleware
 *  It handles the requisition error.
 */
const httpErrors = require ('http-errors'); 

app.use ((req, res, next) => {
  next (httpErrors (404));
});

app.use ((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get ('env') === 'development' ? err : {};

  res.status (err.status || 500);
  res.render ('error');
});

/**
 *  Setup mongoose for the database connection.
 */
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');

dotenv.config ();

mongoose.connect (process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

mongoose.connection.on ('connected', () => {
  `Build mongoose connection open on ${process.env.DATABASE}`;
});

mongoose.connection.on ('error', err => {
  `Build mongoose connection error: ${err.message}`;
});

app.use (function (req, res, next) {
  let error = req.session.error;
  let success = req.session.success;

  delete req.session.error;
  delete req.session.success;

  if (error) {
    res.locals.message = error;
  }

  if (success) {
    res.locals.message = success;
  }

  next ();
});

console.log ('Build studio');
console.log (`New session started (${new Date()})`);

module.exports = app;
