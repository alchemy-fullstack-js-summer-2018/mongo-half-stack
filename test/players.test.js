require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Players API', () => {
    beforeEach(() => {
        return mongo.then(db => {
            db.collection('players').remove();
        });
    });

    let player = {};
    
    beforeEach(() => {
        const data = {
            name: 'Injoong',
            kills: 0,
            wins: 1
        };
        return chai.request(app)
            .post('/players')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                player = body;
            });
    });

    it('gets players', () => {
        console.log(player);
    });
});