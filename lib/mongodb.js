const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const promise = MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
const dbPromise = promise.then(client => {
    console.log('mongodb connected', MONGODB_URI); 
    dbPromise.client = client;
    return client.db('mongoLab'); 
});

module.exports = dbPromise;  