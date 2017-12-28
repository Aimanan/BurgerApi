const pipe = require('lodash/fp/flow');

// Filters
const { abvGtFilter, abvLtFilter } = require('./abv');
//const { ebcGtFilter, ebcLtFilter } = require('./ebc');
const { ibuGtFilter, ibuLtFilter } = require('./ibu');
const { madeBeforeFilter, madeAfterFilter } = require('./made');
const burgerNameFilter = require('./burgerName');
const hopsFilter = require('./hops');
const idsFilter = require('./ids');

function filters (db, opts) {
  const {
    abv_gt,
    abv_lt,
    ibu_gt,
    ibu_lt,
    //ebc_gt,
    //ebc_lt,
    burger_name,
    made_before,
    hops,
    ids
  } = opts;

  return pipe(
    abvGtFilter(abv_gt),
    abvLtFilter(abv_lt),
   // ebcGtFilter(ebc_gt),
   //ebcLtFilter(ebc_lt),
    ibuGtFilter(ibu_gt),
    ibuLtFilter(ibu_lt),
    madeBeforeFilter(made_before),
    burgerNameFilter(burger_name),
    hopsFilter(hops),
    idsFilter(ids)
  )(db)
}

module.exports = filters;
