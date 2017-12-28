const filtersLib = require('../../filtersLib/');
const toInteger = require('lodash/toInteger');
const isEmpty = require('lodash/isEmpty');
const trackEvent = require('../../lib/trackEvent');
const { notFoundError, validationError } = require('../../lib/errorHandler');
const schema = require('../../models/burger');

function burger (req, res, next) {
  req.checkParams(schema);

  const errors = req.validationErrors()

  if (errors) {
    return next(validationError(errors));
  }

  const { burgerId } = req.params;
  const burgerIdInt = toInteger(burgerId);
  const selectedburger = filtersLib.burger(burgerIdInt);

  if (isEmpty(selectedburger)) {
    return next(notFoundError(`No burger found that matches the ID ${burgerId}`));
  }

  trackEvent(`API - /burgers/id - ${req.originalUrl}`);
  res.status(200);
  res.json(selectedburger);
};

module.exports = burger;
