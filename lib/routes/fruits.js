const notFound = require('./not-found');
const Fruit = require('../models/fruit');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Fruit.findOne(id);
const getAll = () => Fruit.find({});

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    // console.log('***METHOD***', method);
    return method(req, res);
};
