const mongo = require('../mongodb');

module.exports = {
    insert(player) {
        return mongo.then(db => {
            return db.collection('leaderboards')
                .insertOne(player)
                .then(result => result.ops[0]);
        });
    }
};