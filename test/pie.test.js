const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('pies api', () => {

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

        return request.post('/pies')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name);
                pie = body;
            });
    });

    it('returns 404 bad url', () => {
        return request
            .get('/bad') 
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets a pie', () => {
        return request.get('/pies')
            .then(({ body }) => {
                assert.deepEqual(body, [pie]);
            });
    });
});