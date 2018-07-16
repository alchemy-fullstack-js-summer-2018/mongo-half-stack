const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('frozen treats API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('frozenTreats').remove();
        });
    });

    let frozenTreat; 
    beforeEach(() => {
        const data = {
            name: 'ice cream',
            flavor: 'vanilla'
        };

        return request
            .post('/frozenTreats')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                frozenTreat = body;
            });
    });

    it('saves a frozen treat', () => {
        assert.ok(frozenTreat._id);
    });

    it('returns 404 or bad url', () => {
        return request  
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);    
            });
    });

    it('gets a frozen treat by id', () => {
        return request
            .get(`/frozenTreats/${frozenTreat._id}`)
            .send(frozenTreat)
            .then(({ body }) => {
                assert.deepEqual(body, frozenTreat);
            });
    });
    it('Updates a frozen treat', () => {
        frozenTreat.type = 'sorbet';
        return request
            .put(`/frozenTreats/${frozenTreat._id}`)   
            .send(frozenTreat)
            .then(({ body }) => {
                assert.deepEqual(body, frozenTreat);
            }); 
    });
    it('Gets frozenTreats', () => {
        return request
            .get('/frozenTreats')
            .then(({ body }) => {
                assert.deepEqual(body, [frozenTreat]);
            });
    });
    it('Removes a frozenTreat', () => {
        return request
            .del(`/frozenTreats/${frozenTreat._id}`)
            .then(() => {
                return request.get('/frozenTreats');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });
});