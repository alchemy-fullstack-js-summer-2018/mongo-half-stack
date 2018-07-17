const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Pies API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('pies').remove();
        });
    });

    let pie;
    beforeEach(() => {
        const data = {
            name: 'creampie'
        };

        return request
            .post('/pies')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                pie = body;
            });
    });
    
    it('saves a pie', () => {
        assert.ok(pie._id);
    });

    it('gets pies', () => {
        return request
            .get('/pies')
            .then(({ body }) => {
                assert.deepEqual(body, [pie]);
            });
    });

    it('get a pie by id', () => {
        return request
            .get(`/pies/${pie._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, pie);
            });
    });

    it('updates a pie', () => {
        pie.name = 'cherry pie';
        return request
            .put(`/pies/${pie._id}`)
            .send(pie)
            .then(({ body }) => {
                assert.deepEqual(body, pie);
            });
    });

    it('removes a pie', () => {
        return request
            .del(`/pies/${pie._id}`)
            .then(() => {
                return request.get('/pies');
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