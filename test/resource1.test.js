//const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Resource1 API', () => {
    it('returns 404 on bad URL', () => {
        return request 
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});
