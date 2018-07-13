const notFound = require('./not-found');
const Player = require('../models/player');

const post = req => Player.insert(req.body);

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    
    return method(req, res);
};