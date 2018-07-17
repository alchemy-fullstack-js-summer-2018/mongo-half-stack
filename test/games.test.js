const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Games API', () => {
    let savedGames = [];
    let splendor = {};
    let lostLegacy = {};

    beforeEach(() => {
        savedGames = [];
        return mongo.then(db => {
            db.collection('games').remove();
        });
    });


    const save = game => {
        return request
            .post('/games')
            .send(game)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, game.name);
                savedGames.push(body);
            });
    };
    
    beforeEach(() => {
        return save({
            name: 'Splendor',
            players: 4,
            type: 'Abstract Strategy'
        });
    });
    beforeEach(() => {
        return save({
            name: 'Lost Legacy',
            players: 4,
            type: 'Casual'
        });
    });
    beforeEach(() => {
        splendor = savedGames[0];
        lostLegacy = savedGames[1];
    });

    it('returns 404 on bad url', () => {
        return request
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets Games', () => {
        return request
            .get('/games')
            .then(({ body }) => {
                assert.deepEqual(body, savedGames);
            });
    });

    it('gets a player by id', () => {
        return request
            .get(`/games/${splendor._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, splendor);
            });
    });

    it('deletes a player', () => {
        return request
            .del(`/games/${lostLegacy._id}`)
            .then((res) => {
                assert.equal(res.status, 200);
            })
            .then(() => {
                return request.get('/games');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [splendor]);
            });
    });

    it('updates a player', () => {
        splendor.type = 'Abstract';
        return request
            .put(`/games/${splendor._id}`)
            .send(splendor)
            .then(({ body }) => {
                assert.deepEqual(body, splendor);
            });
    });
});