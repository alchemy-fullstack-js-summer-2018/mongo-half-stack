const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe.only('Players API', () => {
    let savedPlayers = [];
    let injoong = {};
    let arthur = {};

    beforeEach(() => {
        return mongo.then(db => {
            db.collection('players').remove();
        });
    });
    
    beforeEach(() => {
        const data = [
            {
                name: 'Injoong',
                kills: 10,
                wins: 1
            },
            {
                name: 'Arthur',
                kills: 10,
                wins: 2
            }
        ];
        return request
            .post('/players')
            .send(data)
            .then(({ body }) => {
                assert.equal(body[0].name, data[0].name);
                savedPlayers = body;
            });
    });
    beforeEach(() => {
        injoong = savedPlayers[0];
        arthur = savedPlayers[1];
    });

    it('returns 404 on bad url', () => {
        return request
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('saves a single player', () => {
        const data = {
            name: 'Easton',
            kills: 7000,
            wins: 5
        };
        return request
            .post('/players')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                return request
                    .get(`/players/${body._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.name, data.name);
            });
    }); 

    it('saves and then gets all players', () => {
        return request
            .get('/players')
            .then(({ body }) => {
                assert.deepEqual(body, savedPlayers);
            });
    });

    it('gets a player by id', () => {
        return request
            .get(`/players/${injoong._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, injoong);
            });
    });

    it('deletes a player', () => {
        return request
            .del(`/players/${arthur._id}`)
            .then((res) => {
                assert.equal(res.status, 200);
            })
            .then(() => {
                return request.get('/players');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [injoong]);
            });
    });

    it('updates a player', () => {
        injoong.wins++;
        return request
            .put(`/players/${injoong._id}`)
            .send(injoong)
            .then(({ body }) => {
                assert.deepEqual(body, injoong);
            });
    });
});