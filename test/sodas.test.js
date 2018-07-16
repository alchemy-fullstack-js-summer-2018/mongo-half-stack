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

    it('Gets a soda by id', () => {
        return request
            .get(`/sodas/${soda._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, soda);
            });
    });

    it('Updates a soda', () => {
        soda.size = 'xxl';
        return request
            .put(`/sodas/${soda._id}`)   
            .send(soda)
            .then(({ body }) => {
                assert.deepEqual(body, soda);
            }); 
    });

    it('Gets sodas', () => {
        return request
            .get('/sodas')
            .then(({ body }) => {
                assert.deepEqual(body, [soda]);
            });
    });

    it('Removes a soda', () => {
        return request
            .del(`/sodas/${soda._id}`)
            .then(() => {
                return request.get('/sodas');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });
});