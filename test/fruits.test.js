// const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

const banana = {
    _id : '5b48de85c3356397876ad468',
    name : 'banana',
    color : 'yellow',
    shape : 'long'
};

const orange = {
    _id : '5b48ef3f6e2f2c18eb85a2bd',
    name : 'orange',
    color : 'orange',
    shape : 'round'
};

describe('Fruits API', () => {

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
                console.log('\n\n****here is the info****\n', body);
                assert.deepEqual(body, [banana, orange]);
            });
    });

    it.only('gets a fruit by id', () => {
        return request
            .get(`/fruits/${banana._id}`)
            .then(({ body }) =>{
                assert.deepEqual(body, banana);
            });
            
    });
    
});