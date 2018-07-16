const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insertOne(player) {
        return mongo.then(db => {
            return db.collection('players')
                .insertOne(player)
                .then(result => result.ops[0]);
        });
    },
    insertMany(players) {
        return mongo.then(db => {
            return db.collection('players')
                .insertMany(players)
                .then(result => result.ops);
        });
    },
    find(query) {
        if(query.kills) query.kills = parseInt(query.kills);
        if(query.wins) query.wins = parseInt(query.wins);
        return mongo.then(db => {
            return db.collection('players')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('players')
                .findOne({ _id: ObjectId(id) });
        });
    },
    update(player) {
        const id = player._id;
        delete player._id;

        return mongo.then(db => {
            return db.collection('players')
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
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('players')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};