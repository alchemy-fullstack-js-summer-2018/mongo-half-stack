require('dotenv').config({ path: './test/.env.test' });
const mongo = require('../lib/mongodb');

after(() => {
    mongo.client.close();
});
