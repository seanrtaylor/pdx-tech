const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const index = require('./routes/index');
const companies = require('./routes/companies');

const isProdEnv = process.env.NODE_ENV === 'production';
const app = express();
const logger = console;

app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/', index);
app.use('/companies/', companies);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found', req.url);
  err.status = 404;
  err.stack = '';
  next(err);
});

// error handler
/* istanbul ignore next */
app.use(function(err, req, res) {
  logger.error('Error', err, req.url);
  res.status(err.status || 500);
  const resp = {};
  if (!isProdEnv){
    resp.error = err;
  }
  res.json(resp);
});

const server = http.createServer(app);

//if this is the main executing module, start server
/* istanbul ignore if */
if (require.main === module ){
  server.listen(app.get('port'));
  logger.log('listening on port ', app.get('port'));
} else {
  //otherwise just export the server object
  module.exports = server;
}
