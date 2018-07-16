const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

// const banana = {
//     _id : '5b48de85c3356397876ad468',
//     name : 'banana',
//     color : 'yellow',
//     shape : 'long'
// };

// const orange = {
//     _id : '5b48ef3f6e2f2c18eb85a2bd',
//     name : 'orange',
//     color : 'orange',
//     shape : 'round'
// };

describe('Fruits API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('fruits').remove();
        });
    });

    let banana;
    beforeEach(() => {
        const data = {
            name : 'banana',
            color : 'yellow',
            shape : 'long'
        };

        return request
            .post('/fruits')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                banana = body;
            });
    });

    it('saves a fruit', () => {
        assert.ok(banana._id);
    });

    it('returns 404 on bad URL', () => {
        return request 
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets fruits', () => {
        return request
            .get('/fruits')
            .then(({ body }) => {
                assert.deepEqual(body, [banana]);
            });
    });

    it('gets a fruit by id', () => {
        return request
            .get(`/fruits/${banana._id}`)
            .then(({ body }) =>{
                assert.deepEqual(body, banana);
            });
            
    });

    it('updates a fruit', () => {
        banana.color = 'green';
        return request
            .put(`/fruits/${banana._id}`)
            .send(banana)
            .then(({ body }) => {
                assert.deepEqual(body, banana);
            });
    });

    it('removes a fruit', () => {
        return request
            .del(`/fruits/${banana._id}`)
            .then(() => {
                return request.get('/fruits');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

  
    
});