const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Events API', () => {
    let savedEvents = [];
    let gameNight = {};
    let tournament = {};
    let saturday = {};

    beforeEach(() => {
        return mongo.then(db => {
            db.collection('events').remove();
        });
    });
    
    beforeEach(() => {
        const data = [
            {
                name: 'Game Night',
                games: 'Splendor',
                invitees: ['Arthur', 'Injoong', 'Easton']
            },
            {
                name: 'Tournament',
                games: 'Lost Legacy',
                invitees: ['Arthur', 'Bobby', 'Easton']
            },
            {
                name: 'Saturday',
                games: 'Splendor',
                invitees: ['Arthur', 'Injoong', 'Easton', 'Bobby']
            }
        ];
        return request
            .post('/events')
            .send(data)
            .then(({ body }) => {
                assert.equal(body[0].name, data[0].name);
                savedEvents = body;
            });
    });
    beforeEach(() => {
        gameNight = savedEvents[0];
        tournament = savedEvents[1];
        saturday = savedEvents[2];
    });

    it('returns 404 on bad url', () => {
        return request
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('saves a single event', () => {
        const data = {
            name: 'Friday',
            games: 7000,
            invitees: 5
        };
        return request
            .post('/events')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                return request
                    .get(`/events/${body._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.name, data.name);
            });
    }); 

    it('saves and then gets all events', () => {
        return request
            .get('/events')
            .then(({ body }) => {
                assert.deepEqual(body, savedEvents);
            });
    });

    it('gets a event by id', () => {
        return request
            .get(`/events/${gameNight._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, gameNight);
            });
    });

    it('gets events by query', () => {
        return request
            .get('/events?invitees=3')
            .then(({ body }) => {
                assert.deepEqual(body, [gameNight, tournament]);
            });
    });

    it('deletes a event', () => {
        return request
            .del(`/events/${tournament._id}`)
            .then((res) => {
                assert.equal(res.status, 200);
            })
            .then(() => {
                return request.get('/events');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [gameNight, saturday]);
            });
    });

    it('updates an event', () => {
        gameNight.games = 'Codenames';
        return request
            .put(`/events/${gameNight._id}`)
            .send(gameNight)
            .then(({ body }) => {
                assert.deepEqual(body, gameNight);
            });
    });
});