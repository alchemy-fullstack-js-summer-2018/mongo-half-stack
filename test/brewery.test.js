const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Brewery API', () => {

    let beers = [];
    
    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('brewery').remove();
        });
    });
    
    let maibock = {
        brewery: 'Rogue Brewery',
        name: 'Dead Guy Ale',
        origin: 'Portland, OR'
    };
    let stout = {
        brewery: 'Guinness',
        name: 'Extra Stout',
        origin: 'Dublin, Ireland'
    };
    let beer;
    beforeEach(() => {
        const data = {
            brewery: 'Rogue Brewery',
            name: 'Dead Guy Ale',
            origin: 'Portland, OR'
        };

        return request
            .post('/brewery')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                beer = body;
            });
    });

    it('Saves a beer', () => {
        assert.ok(beer._id);
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
            .get(`/brewery/${beer._id}`)
            .then(({ body }) => {
                assert.equal(body._id, beer._id);
            });
    });

    it('Updates beer', () => {
        beer.origin = 'Portland';
        return request
            .put(`/brewery/${beer._id}`)
            .send(beer)
            .then(({ body }) => {
                assert.equal(body.origin, 'Portland');
            });
    });

    it('Drinks beer', () => {
        return request
            .del(`/brewery/${beer._id}`)
            .then(({ body }) => {
                assert.equal(body.removed, true);
            });
    });

    it('Beers for everyone!', () => {
        return request
            .get('/brewery')
            .then(({ body }) => {
                assert.deepEqual(body, [beer]);
            });

    });
});