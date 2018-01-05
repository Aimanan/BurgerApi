const BaseData = require('./base/base.data');
const Burger = require('../models/burger');
const { ObjectID } = require('mongodb');

class BurgerData extends BaseData {
    constructor(db) {
        super(db, Burger);
    }

    // updateById(model) {
    //     return this.collection.updateOne({
    //         _id: model._id
    //     }, model);
    // }

    // async findByBurgerName(burgername) {
    //     const burgerToLower = burgername.toLowerCase();
    //     const burger = this.collection.findOne({ burgername });

    //     if (!burger) {
    //         return console.log('No such burger was found');
    //     }
    //     return burger;
    // }

    findById(_id) {
        return this.collection
            .findOne({ _id });
    }

    _isModelValid(model) {
        // TODO: Add burger validation
        return typeof model !== 'undefined' &&
            typeof model.name === 'string' &&
            typeof model.abv === 'number' &&
            typeof model.ebc === 'number'; // and so on...
    }
}

module.exports = BurgerData;
