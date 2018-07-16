const notFound = require('./not-found');
const Dessert = require('../models/dessert');

const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Dessert.findOne(id);
const getAll = () => Dessert.find({});
// const post = req => Fruit.insert(req.body);
// const put = req => Fruit.update(req.body);
// const del = req => Fruit.remove(req.id).then(() => ({ removed: true }));

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    // console.log('***METHOD***', method);
    return method(req, res);
};
