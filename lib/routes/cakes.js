const notFound = require('./not-found');
const Cake = require('../models/cake');

const post = req => Cake.insert(req.body);

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Cake.findOne(id);
const getAll = () => Cake.find({});

const methods = { get, getOne, getAll, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};