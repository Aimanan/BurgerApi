const Boom = require('boom');

function validationError (validationErrors) {
  const error = Boom.badRequest('Invalid query params');
  error.output.payload.data = validationErrors;
  return error
}

function notFoundError (msg) {
  return Boom.notFound(msg);
}

function tooManyRequestsError () {
  return Boom.tooManyRequests('You have reached your limit on this ip for an hour');
}

function errorHandler (err, req, res, next) {
  console.log(err);
  var boomError = Boom.wrap(err);
  if (boomError.isServer) {
    boomError.output.payload.message = 'Something has gone wrong on our end please try again';
  }

  res.status(boomError.output.statusCode);
  res.send(boomError.output.payload);
}

module.exports = { 
  errorHandler, 
  notFoundError, 
  validationError, 
  tooManyRequestsError };
