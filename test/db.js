require('dotenv').config({ path: './test/.env.test' || 'mongodb://localhost:27017/carbyn' });
const mongo = require('../lib/mongodb');

after(() => {
    mongo.client.close();
});
