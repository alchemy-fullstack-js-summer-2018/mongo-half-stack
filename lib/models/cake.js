const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(cake) {
        return mongo.then(db => {
            return db.collection('cakes')
                .insertOne(cake)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('cakes')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('cakes')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    }
};