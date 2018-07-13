const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Sodas API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('sodas').remove();
        });
    });

    let soda; 
    beforeEach(() => {
        const data = {
            name: 'coke',
            size: 'large'
        };

        return request
            .post('/sodas')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                soda = body;
            });
    });

    it('saves a soda', () => {
        assert.ok(soda._id);
    });

    it('Returns 404 on bad url', () => {
        return request
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});