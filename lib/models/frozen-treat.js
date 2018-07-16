const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(frozenTreat) {
        return mongo.then(db => {
            return db.collection('frozenTreats')
                .insertOne(frozenTreat)
                .then(result => result.ops[0]);
        });
    },
    
    findOne(id) {
        return mongo.then(db => {
            return db.collection('frozenTreats')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });    
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('frozenTreats')
                .find(query)
                .toArray();
        });
    },
    update(frozenTreat) {
        const id = frozenTreat._id;
        delete frozenTreat._id;

        return mongo.then(db => {
            return db.collection('frozenTreats')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: frozenTreat
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('frozenTreats')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};
