const db = require('../db/index');
const data = require('../data');
const uniqueRandomArray = require('unique-random-array');
const sortBy = require('lodash/sortBy');
const filters = require('./filters');
const idFilter = require('./filters/id');
const config = require('../config');

//console.log(sortedDb+ "sortedDb");
const random = () => {
  return Promise.resolve(db.init(config.conncetionString)
    .then(burgers => {
      return burgers.collection('burger1')
        .find({})
        .toArray()
        .then(burger => {
          const sortedDb = sortBy(burger, ['id']);
      
          const randomBurger = uniqueRandomArray(sortedDb);

          return [randomBurger()];
        });
  }));
};

module.exports = { random };

// exports.burger = (id) => {
//   const chosenBurger = idFilter(id, sortedDb);

//   return chosenBurger;
// }

// exports.burgers = (options = {}) => {
//   return filters(sortedDb, options);
// }
