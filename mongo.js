/* not necessary */
const { MongoClient/* , ObjectId */ } = require('mongodb');


const url = 'mongodb://localhost:27017/treats';
let client = null;
MongoClient.connect(url, { useNewUrlParser: true })
    .then(_client => {
        client = _client;
        const db = client.db();
        return db.collection('pies');
    })
    .then(pies => {
        console.log(
            JSON.stringify(pies, true, 1)
        );
    })
    .catch(err => {
        console.log('FAIL!', err);
    })
    .then(() => {
        client.close();
    });