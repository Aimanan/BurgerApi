const moment = require('moment');

const isDateBefore = (madeOn, predicate) => {
  const parsedMadeOn = moment(madeOn, 'MM/YYYY');
  const parsedPredicate = moment(predicate, 'MM-YYYY');

  if (!parsedPredicate.isValid()) return false;

  return parsedMadeOn.isBefore(parsedPredicate);
}

exports.isDateBefore = isDateBefore;
