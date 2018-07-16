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
    },
    update(cake) {
        const id = cake._id;
        delete cake._id;

        return mongo.then(db => {
            return db.collection('cakes')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: cake,
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('cakes')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};