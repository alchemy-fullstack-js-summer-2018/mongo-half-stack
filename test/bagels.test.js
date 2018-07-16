const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Bagel API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('bagels').remove();
        });
    });

    let bagel;

    beforeEach(() => {
        const data = {
            name: 'Cheese Bagel',
            price: 3.50
        };

        return request
            .post('/bagels')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                bagel = body;
            });
    });

    it('saves a bagel', () => {
        assert.ok(bagel._id);
    });

    it('gets a bagel by id', () => {
        return request
            .get(`/bagels/${bagel._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, bagel);
            });
    });

    it('gets all bagels', () => {
        return request
            .get('/bagels')
            .then(({ body }) => {
                assert.deepEqual(body, [bagel]);
            });       
    });

    it('removes a bagel', () => {
        return request
            .del(`/bagels/${bagel._id}`)
            .then(() => {
                return request.get('/bagels');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });
});