const notFound = require('./not-found');
const Game = require('../models/game');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Game.findOne(id);
const getAll = () => Game.find({});
const post = req => Game.insert(req.body);
const put = req => Game.update(req.body);
const del = req => Game.remove(req.id);

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    
    return method(req, res);
};