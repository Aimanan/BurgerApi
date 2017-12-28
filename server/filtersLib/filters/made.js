const filter = require('lodash/filter');
const curry = require('lodash/curry');
const { isDateBefore, isDateAfter } = require('../helpers/dates');

function madeBeforeFilter (val, db) {
  if (val == null) return db;
  return filter(db, (b) => isDateBefore(b.madeOn, val));
}

exports.madeBeforeFilter = curry(madeBeforeFilter);

