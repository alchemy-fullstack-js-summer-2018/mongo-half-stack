const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(game) {
        return mongo.then(db => {
            return db.collection('games')
                .insertOne(game)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('games')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('games')
                .findOne({ _id: ObjectId(id) });
        });
    },
    update(game) {
        const id = game._id;
        delete game._id;

        return mongo.then(db => {
            return db.collection('games')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: game
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('games')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};