const notFound = require('./not-found');
const frozenTreats = require('../models/frozen-treat');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => frozenTreats.findOne(id);
const getAll = () => frozenTreats.find({}); 
const post = req => frozenTreats.insert(req.body);
const put = req => frozenTreats.update(req.body);
const del = req => frozenTreats.remove(req.id).then(() => ({ remove: true }));


const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};