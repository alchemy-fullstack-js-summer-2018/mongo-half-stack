const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(player) {
        return mongo.then(db => {
            return db.collection('leaderboards')
                .insertOne(player)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('leaderboards')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('leaderboards')
                .findOne({ _id: ObjectId(id) });
        });
    },
    update(player) {
        const id = player._id;
        delete player._id;

        return mongo.then(db => {
            return db.collection('leaderboards')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: player
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    }
};