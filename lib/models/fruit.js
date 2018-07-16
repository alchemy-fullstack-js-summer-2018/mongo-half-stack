const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(fruit) {
        return mongo.then(db => {
            return db.collection('fruits')
                .insertOne(fruit)
                .then(result => result.ops[0]);
        });
    },

    find(query) {
        return mongo.then(db => {
            return db.collection('fruits')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        console.log('***ID HERE***', id);
        return mongo.then(db => {
            return db.collection('fruits')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    }
};