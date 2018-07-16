// const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Desserts API', () => {

    // beforeEach(() => {
    //     return mongo.then(db => {
    //         return db.collection('fruits').remove();
    //     });
    // });

    // let banana;
    // beforeEach(() => {
    //     const data = {
    //         name : 'banana',
    //         color : 'yellow',
    //         shape : 'long'
    //     };

    //     return request
    //         .post('/fruits')
    //         .send(data)
    //         .then(({ body }) => {
    //             assert.ok(body._id);
    //             assert.equal(body.name, data.name);
    //             banana = body;
    //         });
    // });

    // it('saves a fruit', () => {
    //     assert.ok(banana._id);
    // });

    const cookie = {
        _id : '5b4cde443122f8ec53c23d34',
        type : 'cookie',
        description : 'snickerdoodle'
    };

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

    // it('gets a dessert by id', () => {
    //     return request
    //         .get(`/desserts/${cookie._id}`)
    //         .then(({ body }) =>{
    //             assert.deepEqual(body, cookie);
    //         });
            
    // });

    // it('removes a fruit', () => {
    //     return request
    //         .del(`/fruits/${banana._id}`)
    //         .then(() => {
    //             return request.get('/fruits');
    //         })
    //         .then(({ body }) => {
    //             assert.deepEqual(body, []);
    //         });
    // });

    // it('updates a fruit', () => {
    //     banana.color = 'green';
    //     return request
    //         .put(`/fruits/${banana._id}`)
    //         .send(banana)
    //         .then(({ body }) => {
    //             assert.deepEqual(body, banana);
    //         });
    // });


  
    
});