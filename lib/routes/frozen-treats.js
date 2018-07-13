const notFound = require('./not-found');
const frozenTreats = require('../models/frozen-treats');

// const get = (req, res) => {
//     const id = req.id;
//     id ? getOne(id, req, res) : getAll(req, res);
// };

// const getOne = (id, req, res) => {

// };

// const getAll = (req, res) => {

// };

const post = req => frozenTreats.insert(req.body);


// const put = (req, res) => {

// };

// const del = (req, res) => {

// };
const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
