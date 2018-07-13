const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/mongoLab';
let client = null;
MongoClient.connect(url, { useNewUrlParser: true })
    .then(_client => {
        client = _client;
        const db = client.db();
        return db.collection('coffee'); 
    });
