const notFound = require('./not-found');
const Player = require('../models/player');

const post = req => Player.insert(req.body);
const get = () => getAll();
const getAll = () => Player.find({});

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    
    return method(req, res);
};