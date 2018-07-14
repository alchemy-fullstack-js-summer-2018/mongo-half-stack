const notFound = require('./not-found');
const Fruit = require('../models/fruit');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Fruit.findOne(id);
const getAll = () => Fruit.find({});
const post = req => Fruit.insert(req.body);
const put = req => Fruit.update(req.body);
const del = req => Fruit.remove(req.id).then(() => ({ removed: true }));

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};