const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let client = null;

MongoClient.connect(url, { useNewUrlParser: true })
    .then(_client => {
        client = _client;
        const db = client.db('alchemy');
        return db.collection();
    });