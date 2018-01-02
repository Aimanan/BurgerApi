const db = require('../db/index');
const data = require('../data');
const uniqueRandomArray = require('unique-random-array');
const sortBy = require('lodash/sortBy');
const filters = require('./filters');
const idFilter = require('./filters/id');
const config = require('../config');

const filter = require('lodash/filter');
const curry = require('lodash/curry');

const random = () => {
  return Promise.resolve(db.init(config.conncetionString)
    .then(burgers => {
      return burgers.collection('burgers')
        .find({})
        .toArray()
        .then(burger => {
          const sortedDb = sortBy(burger, ['id']);
      
          const randomBurger = uniqueRandomArray(sortedDb);

          return [randomBurger()];
        });
  }));
};

const burgers=(options={}) => {
  return Promise.resolve(db.init(config.conncetionString)
    .then( burgers => {
      return burgers.collection('burgers')
        .find({})
        .toArray()
        .then(function () {
          const sortedDb = sortBy(burgers, ['id']);
          //const burgerByAbv = uniqueRandomArray(sortedDb);
          console.log('here are the options---------------------------------------------------------------');
          console.log(options);
          //console.log(filters(sortedDb, options));
          return filters(sortedDb, options);

        });

    }));
};

// function burgers (options={}){
//   return filters(sortedDb, options);
// };

module.exports = { random, burgers };
