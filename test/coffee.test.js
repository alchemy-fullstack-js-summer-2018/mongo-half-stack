const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Coffee API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('coffee').remove();
        });
    });

    let drink;

    beforeEach(() => {
        const data = {
            name: 'White Mocha',
            price: 3.50,
            size: 'Grande'
        };
        

        return request
            .post('/coffee')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                drink = body;
            });
    });

    it('returns a 404', () => {
        return request
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('saves a drink', () => {
        assert.ok(drink._id);
    });

    it('gets a coffee drink by id', () => {
        return request
            .get(`/coffee/${drink._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, drink);
            });
    });

    it('gets all coffee drinks', () => {
        return request
            .get('/coffee')
            .then(({ body }) => {
                assert.deepEqual(body, [drink]);
            });
    });

    it('removes a coffee drink', () => {
        return request
            .del(`/coffee/${drink._id}`)
            .then(() => {
                return request.get('/coffee');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('updates a coffee drink', () => {
        drink.name = 'Mocha';
        return request
            .put(`/coffee/${drink._id}`)
            .send(drink)
            .then(({ body }) => {
                assert.deepEqual(body, drink);
            });
    });

});