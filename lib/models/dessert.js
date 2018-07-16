const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    // insert(fruit) {
    //     return mongo.then(db => {
    //         return db.collection('fruits')
    //             .insertOne(fruit)
    //             .then(result => result.ops[0]);
    //     });
    // },

    find(query) {
        return mongo.then(db => {
            return db.collection('desserts')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('desserts')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    }
    // update(fruit) {
    //     const id = fruit._id;
    //     delete fruit._id;

    //     return mongo.then(db => {
    //         return db.collection('fruits')
    //             .findOneAndUpdate({
    //                 _id: ObjectId(id)
    //             },
    //             {
    //                 $set: fruit
    //             },
    //             {
    //                 returnOriginal: false
    //             })
    //             .then(result => result.value);
    //     });
    // },
    // remove(id) {
    //     return mongo.then(db => {
    //         return db.collection('fruits')
    //             .removeOne({
    //                 _id: ObjectId(id)
    //             });
    //     });
    // }

};