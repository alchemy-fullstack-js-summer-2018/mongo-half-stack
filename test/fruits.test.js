//const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

let fruit = [{
    name : 'banana',
    color : 'yellow',
    shape : 'long'
},

{
    name : 'orange',
    color : 'orange',
    shape : 'round'
}];

describe('Fruits API', () => {
    it('gets fruits', () => {
        return request
            .get('/fruits')
            .then(({ body }) => {
                console.log('\n\n****here is the info**\n', body);
                assert.deepEqual(body, [fruit]);
            });
    });
});