const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Cakes API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('cakes').remove();
        });
    });

    let cake;
    beforeEach(() => {
        const data = {
            name: 'Lamington',
        };

        return request 
            .post('/cakes')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                cake = body;
            });
    });

    it('saves a cake', () => {
        assert.ok(cake._id);
    });

    it('gets cakes', () => {
        return request
            .get('/cakes')
            .then(({ body }) => {
                assert.deepEqual(body, [cake]);
            });
    });

    it('gets a cake by id', () => {
        return request
            .get(`/cakes/${cake._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, cake);
            });
    });

    it('updates a cake', () => {
        cake.name = 'Birthday Cake';
        return request
            .put(`/cakes/${cake._id}`)
            .send(cake)
            .then(({ body }) => {
                assert.deepEqual(body, cake);
            });
    });

    it('removes a cake', () => {
        return request
            .del(`/cakes/${cake._id}`)
            .then(() => {
                return request.get('/cakes');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('returns 404 bad url', () => {
        return request
            .get('/bad') 
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});