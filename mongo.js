const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/food';
let client = null;
MongoClient.connect(url, { useNewUrlParser: true })
    .then(_client => {
        client = _client;
        const db = client.db();
        return db.collection('fruits');
    })
    .then(fruits => {
        console.log(
            JSON.stringify(fruits, true, 2)
        );
    })
    .catch(err => {
        console.log('FAIL!', err);
    })
    .then(() => {
        client.close();
    });