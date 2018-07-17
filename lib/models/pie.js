const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(pie) {
        return mongo.then(db => {
            return db.collection('pies')
                .insertOne(pie)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('pies')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('pies')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    },
    update(pie) {
        const id = pie._id;
        delete pie._id;

        return mongo.then(db => {
            return db.collection('pies')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: pie
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);       
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('pies')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};