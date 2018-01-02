const BaseData = require('./base/base.data');
const Burger = require('../models/burger');
const { ObjectID } = require('mongodb');
const sortBy = require('lodash/sortBy');
const filter = require('lodash/filter');
const curry = require('lodash/curry');
const uniqueRandomArray = require('unique-random-array');

class BurgerData extends BaseData {
    constructor(db) {
        super(db, Burger);
    }

    // updateById(model) {
    //     return this.collection.updateOne({
    //         _id: model._id
    //     }, model);
    // }

    findByBurgerName(burgername) {
        const burgerToLower = burgername.toLowerCase();

        const burger = this.collection.findOne({ burgername });

        return new Promise((resolve, reject) => {
            if (!burger) {
                return reject('No such burger was found');
            }
            return resolve(burger);
        });
    }

    findById(_id) {
        return this.collection
            .findOne({ _id });
    }

    // sortByABV (val, db) { 
    //       if (val === null) return db;
    //       return filter(db, (b) => b.abv > val);
    // }

    _isModelValid(model) {
        // TODO: Add burger validation
        return typeof model !== 'undefined' &&
            typeof model.name === 'string' &&
            typeof model.abv === 'number' &&
            typeof model.ebc === 'number'; // and so on...
    }
}

module.exports = BurgerData;
