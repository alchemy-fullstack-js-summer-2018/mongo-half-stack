const mongo = require('../lib/mongodb');
const { assert } = require ('chai');
const request = require('./request');

describe('Fruits API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('fruits').remove();
        });
    });

    let berries;
    let tropical;

    beforeEach(() => {
        const fruit1 = {
            name: 'Strawberries',
            color: 'red',
            calories: '75'
        };

        return request
            .post('/fruits')
            .send(fruit1)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, fruit1.name);
                berries = body;
            });
    });
    beforeEach(() => {
        const fruit2 = {
            name: 'Mangoes',
            color: 'yellow',
            calories: '201'
        };

        return request
            .post('/fruits')
            .send(fruit2)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, fruit2.name);
                tropical = body;
            });
    });

    it('saves  a fruit', () => {
        assert.ok(berries._id);
        // assert.ok(fruit._id);
    });

    it('returns 404 on a bad url', () => {
        return request
            .get('/bad-url')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets a fruit by id', () => {
        return request
            .get(`/fruits/${berries._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, berries);
            });
    });

    it('updates a fruit', () => {
        berries.calories = '60';
        return request
            .put(`/fruits/${berries._id}`)
            .send(berries)
            .then(({ body }) => {
                assert.deepEqual(body.calories, '60');
            });
    });

    it('get all fruits', () => {
        return request
            .get('/fruits')
            .then(({ body }) => {
                assert.deepEqual(body, [berries, tropical]);
            });
    });

    it ('removes a fruit', () => {
        return request
            .del(`/fruits/${tropical._id}`)
            .then(() => {
                return request.get('/fruits');
            })
            .then(({ body }) => {  
                assert.deepEqual(body, [berries]);
            });
    });
});