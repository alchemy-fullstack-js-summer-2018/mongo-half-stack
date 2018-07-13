const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Players API', () => {
    beforeEach(() => {
        return mongo.then(db => {
            db.collection('players').remove();
        });
    });

    let player = {};
    
    beforeEach(() => {
        const data = {
            name: 'Injoong',
            kills: 0,
            wins: 1
        };
        return request
            .post('/players')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                player = body;
            });
    });

    it('gets players', () => {
        console.log(player);
    });
});