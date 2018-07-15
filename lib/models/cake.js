const mongo = require('../mongodb');
// const { ObjectId } = require('mongodb');

module.exports = {
    insert(cake) {
        return mongo.then(db => {
            return db.collection('cakes')
                .insertOne(cake)
                .then(result => result.ops[0]);
        });
    }
};