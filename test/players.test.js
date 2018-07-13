const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Players API', () => {
    beforeEach(() => {
        return mongo.then(db => {
            db.collection('leaderboards').remove();
        });
    });

    let savedPlayers = [];

    const save = player => {
        return request
            .post('/players')
            .send(player)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, player.name);
                savedPlayers.push(body);
            });
    };
    
    beforeEach(() => {
        return save({
            name: 'Injoong',
            kills: 0,
            wins: 1
        });
    });
    beforeEach(() => {
        return save({
            name: 'Arthur',
            kills: 10,
            wins: 2
        });
    });

    it('gets players', () => {
        return request
            .get('/players')
            .then(({ body }) => {
                assert.deepEqual(body, savedPlayers);
            });
    });
});