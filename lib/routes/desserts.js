const notFound = require('./not-found');
const Dessert = require('../models/dessert');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Dessert.findOne(id);
const getAll = () => Dessert.find({});
const post = req => Dessert.insert(req.body);
const put = req => Dessert.update(req.body);
// const del = req => Dessert.remove(req.id).then(() => ({ removed: true }));

const methods = { get, post, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};
