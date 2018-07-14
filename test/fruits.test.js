const mongo = require('../lib/mongodb');
const { assert } = require ('chai');
const request = require('./request');

describe('Fruits API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('fruits').remove();
        });
    });

    let fruit;
    beforeEach(() => {
        const data = {
            name: 'Strawberries',
            color: 'red',
            calories: '75'
        };

        return request
            .post('/fruits')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                fruit = body;
            });
    });

    it('saves  a fruit', () => {
        assert.ok(fruit._id);
    });

    it('returns 404 on a bad url', () => {
        return request.get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});