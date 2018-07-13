const mongo = require('../mongodb');
//const { ObjectId } = require('mongodb');

module.exports = {
    find(query) {
        return mongo.then(db => {
            return db.collection('fruits')
                .find(query)
                .toArray();
        });
    }
};