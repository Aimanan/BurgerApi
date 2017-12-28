const filtersLib = require('../../filtersLib/');
const paginate = require('../../lib/paginate');
const trackEvent = require('../../lib/trackEvent');
const schema = require('../../models/burgers');
const { validationError } = require('../../lib/errorHandler');

function burgers (req, res, next) {
  req.checkQuery(schema);
  const errors = req.validationErrors();

  if (errors) {
    return next(validationError(errors));
  }

  const filteredDb = filtersLib.burgers(req.query);
  const paginatedBurgers = paginate(filteredDb, req);

  trackEvent(`API - /burgers/ - ${req.originalUrl}`);

  res.status(200);
  res.json(paginatedBurgers);
};

module.exports = burgers;
