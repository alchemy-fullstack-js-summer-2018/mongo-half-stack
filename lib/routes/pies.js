const notFound = require('./not-found');
const Pie = require('../models/pie');

const post = req => Pie.insert(req.body);

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    return method(req, res);
};