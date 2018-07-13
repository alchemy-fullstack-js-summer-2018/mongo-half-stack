const notFound = require('./not-found');
const Soda = require('../models/soda');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Soda.findOne(id);
const getAll = () => Soda.find({}); 
const post = req => Soda.insert(req.body);
const put = req => Soda.update(req.body);
const del = req => Soda.remove(req.id).then(() => ({ remove: true }));


const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLOwerCase()] || notFound;
    method(req, res);
};