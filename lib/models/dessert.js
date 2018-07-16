const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(dessert) {
        return mongo.then(db => {
            return db.collection('desserts')
                .insertOne(dessert)
                .then(result => result.ops[0]);
        });
    },

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
    },
    update(dessert) {
        const id = dessert._id;
        delete dessert._id;

        return mongo.then(db => {
            return db.collection('desserts')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: dessert
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    }
    // remove(id) {
    //     return mongo.then(db => {
    //         return db.collection('fruits')
    //             .removeOne({
    //                 _id: ObjectId(id)
    //             });
    //     });
    // }

};