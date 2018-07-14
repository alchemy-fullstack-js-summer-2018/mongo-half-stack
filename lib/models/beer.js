const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(beer) {
        return mongo.then(db => {
            return db.collection('brewery')
                .insertOne(beer)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('brewery')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('brewery')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    },
    update(beer) {
        const id = beer._id;
        delete beer._id;

        return mongo.then(db => {
            return db.collection('brewery')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: beer
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('brewery')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};