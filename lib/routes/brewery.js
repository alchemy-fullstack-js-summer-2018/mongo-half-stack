const notFound = require('./not-found');
const Beer = require('../models/beer');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Beer.findOne(id);
const getAll = () => Beer.find({});
const post = req => Beer.insert(req.body);
const put = req => Beer.update(req.body);
const del = req => Beer.remove(req.id).then(() => ({ removed: true }));

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};