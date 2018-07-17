const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
let client = null;
MongoClient.connect(url, { useNewUrlParser: true })
    .then(_client => {
        client = _client;
        const db = client.db('mongoLab');
        return db.collection(); 
    });
