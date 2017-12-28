// const BaseData = require('./base/base.data');
// const Post = require('../models/post.model');
// const { ObjectID } = require('mongodb');

// class PostData extends BaseData {
//     constructor(db) {
//         super(db, Post);
//     }

//     updateById(model) {
//         return this.collection.updateOne({
//             _id: model._id
//         }, model);
//     }

//     findById(_id) {
//         return this.collection
//             .findOne({ _id });
//     }
// }

// module.exports = PostData;
