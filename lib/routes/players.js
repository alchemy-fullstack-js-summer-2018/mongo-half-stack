const notFound = require('./not-found');
const Player = require('../models/player');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Player.findOne(id);
const getAll = () => Player.find({});
const post = req => req.body.length ? postMany(req) : postOne(req);
const postOne = req => Player.insertOne(req.body);
const postMany = req => Player.insertMany(req.body);
const put = req => Player.update(req.body);
const del = req => Player.remove(req.id);

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    
    return method(req, res);
};