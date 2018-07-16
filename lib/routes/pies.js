const notFound = require('./not-found');
const Pie = require('../models/pie');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Pie.findOne(id);
const getAll = () => Pie.find({});
const post = req => Pie.insert(req.body);
const put = req => Pie.update(req.body);
const del = req => Pie.remove(req.id).then(() => ({ removed: true }));

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};