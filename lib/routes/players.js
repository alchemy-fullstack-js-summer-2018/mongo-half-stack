const notFound = require('./not-found');
const Player = require('../models/player');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Player.findOne(id);
const getAll = () => Player.find({});
const post = req => Player.insert(req.body);
const put = req => Player.update(req.body);

const methods = { get, post, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    
    return method(req, res);
};