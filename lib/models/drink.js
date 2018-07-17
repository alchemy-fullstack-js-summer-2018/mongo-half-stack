const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(drink) {
        return mongo.then(db => {
            return db.collection('coffee')
                .insertOne(drink)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('coffee')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('coffee')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('coffee')
                .removeOne({ _id: ObjectId(id) });
        });
    },
    update(drink) {
        const id = drink._id;
        delete drink._id;

        return mongo.then(db => {
            return db.collection('coffee')
                .findOneAndUpdate({ 
                    _id: ObjectId(id) 
                },
                {
                    $set: drink
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    }
};