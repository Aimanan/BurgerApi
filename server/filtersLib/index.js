const db = require('../db/index');
const uniqueRandomArray = require('unique-random-array');
const sortBy = require('lodash/sortBy');
const filters = require('./filters');
const idFilter = require('./filters/id');

const sortedDb = sortBy(db, ['id']);
console.log(sortedDb+ "sortedDb");
exports.random = () => {
  const randomBurger = uniqueRandomArray(sortedDb);

  return [randomBurger()];
}

exports.burger = (id) => {
  const chosenBurger = idFilter(id, sortedDb);

  return chosenBurger;
}

exports.burgers = (options = {}) => {
  return filters(sortedDb, options);
}
