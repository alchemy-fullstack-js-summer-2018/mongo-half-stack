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

    remove(id) {
        return mongo.then(db => {
            return db.collection('sodas')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};