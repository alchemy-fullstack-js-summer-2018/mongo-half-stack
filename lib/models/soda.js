const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(soda) {
        return mongo.then(db => {
            return db.collection('sodas')
                .insertOne(soda)
                .then(result => result.ops[0]);
        });
    },

    find(query) {
        return mongo.then(db => {
            return db.collection('sodas')
                .find(query)
                .toArray();
        });
    },

    findOne(id) {
        return mongo.then(db => {
            return db.collection('sodas')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    }, 

    update(soda) {
        const id = soda._id;
        delete soda._id;

        return mongo.then(db => {
            return db.collection('sodas')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: soda
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    },

    remove(id) {
        return mongo.then(db => {
            return db.collection('sodas')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};