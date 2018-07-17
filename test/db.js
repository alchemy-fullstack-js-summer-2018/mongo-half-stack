require('dotenv').config({ path: '../.env' });
const mongo = require('../lib/mongodb');

after (() => {
    mongo.client.close();
});

