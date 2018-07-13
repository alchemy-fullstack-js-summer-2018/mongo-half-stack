const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('frozen treats API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('frozen-treats').remove();
        });
    });

    it('returns 404 or bad url', () => {
        return request  
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);    
            });
    });
});