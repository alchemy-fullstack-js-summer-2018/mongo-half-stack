const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insertOne(event) {
        return mongo.then(db => {
            return db.collection('events')
                .insertOne(event)
                .then(result => result.ops[0]);
        });
    },
    insertMany(events) {
        return mongo.then(db => {
            return db.collection('events')
                .insertMany(events)
                .then(result => result.ops);
        });
    },
    find(query) {
        if(query.invitees) query.invitees = { $size: parseInt(query.invitees) };
        return mongo.then(db => {
            return db.collection('events')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('events')
                .findOne({ _id: ObjectId(id) });
        });
    },
    update(event) {
        const id = event._id;
        delete event._id;

        return mongo.then(db => {
            return db.collection('events')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: event
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('events')
                .removeOne({
                    _id: ObjectId(id)
                });
        });
    }
};