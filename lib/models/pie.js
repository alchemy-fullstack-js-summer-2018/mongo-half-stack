const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(pie) {
        return mongo.then(db => {
            return db.collection('pies')
                .insertOne(pie)
                .then(result => result.ops[0]);
        });
    }
};