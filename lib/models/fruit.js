const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    find(query) {
        return mongo.then(db => {
            return db.collection('fruits')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        console.log('***ID HERE***', id);
        return mongo.then(db => {
            return db.collection('fruits')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    }
};