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
};
