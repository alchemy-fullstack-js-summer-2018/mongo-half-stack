const notFound = require('./not-found');
const Pie = require('../models/pie');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Pie.findOne(id);
const getAll = () => Pie.find({});
const post = req => Pie.insert(req.body);

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};