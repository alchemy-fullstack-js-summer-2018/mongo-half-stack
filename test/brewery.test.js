const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Brewery API', () => {
    
    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('brewery').remove();
        });
    });
    
    let maibock;
    let stout;

    beforeEach(() => {
        const beer1 = {
            brewery: 'Rogue Brewery',
            name: 'Dead Guy Ale',
            origin: 'Portland, OR'
        };

        return request
            .post('/brewery')
            .send(beer1)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, beer1.name);
                maibock = body;
            });
    });
    beforeEach(() => {
        const beer2 = {
            brewery: 'Guinness',
            name: 'Extra Stout',
            origin: 'Dublin, Ireland'
        };

        return request
            .post('/brewery')
            .send(beer2)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, beer2.name);
                stout = body;
            });
    });

    it('Saves a beer', () => {
        assert.ok(maibock._id);
    });

    it('Returns 404 on bad url', () => {
        return request
            .get('/no-beer')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('Orders a beer by id', () => {
        return request
            .get(`/brewery/${maibock._id}`)
            .then(({ body }) => {
                assert.equal(body._id, maibock._id);
            });
    });

    it('Updates beer', () => {
        maibock.origin = 'Portland';
        return request
            .put(`/brewery/${maibock._id}`)
            .send(maibock)
            .then(({ body }) => {
                assert.equal(body.origin, 'Portland');
            });
    });

    it('Drinks beer', () => {
        return request
            .del(`/brewery/${maibock._id}`)
            .then(({ body }) => {
                assert.equal(body.removed, true);
            });
    });

    it('Beers for everyone!', () => {
        return request
            .get('/brewery')
            .then(({ body }) => {
                assert.deepEqual(body, [maibock, stout]);
            });

    });
});