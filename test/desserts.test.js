const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Desserts API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('desserts').remove();
        });
    });

    let cookie;
    beforeEach(() => {
        const data = {
            type : 'cookie',
            description : 'snickerdoodle'
        };

        return request
            .post('/desserts')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                cookie = body;
            });
    });

    it('saves a fruit', () => {
        assert.ok(cookie._id);
    });

    it('returns 404 on bad URL', () => {
        return request 
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets desserts', () => {
        return request
            .get('/desserts')
            .then(({ body }) => {
                assert.deepEqual(body, [cookie]);
            });
    });

    it('gets a dessert by id', () => {
        return request
            .get(`/desserts/${cookie._id}`)
            .then(({ body }) =>{
                assert.deepEqual(body, cookie);
            });
            
    });

    it('removes a dessert', () => {
        return request
            .del(`/desserts/${cookie._id}`)
            .then(() => {
                return request.get('/desserts');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('updates a dessert', () => {
        cookie.description = 'chocolate chip';
        return request
            .put(`/desserts/${cookie._id}`)
            .send(cookie)
            .then(({ body }) => {
                assert.deepEqual(body, cookie);
            });
    });


  
    
});