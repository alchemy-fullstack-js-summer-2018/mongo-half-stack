const Bagel = require('../models/bagel');

const post = req => Bagel.insert(req.body);
const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Bagel.findOne(id);
const getAll = () => Bagel.find({});
const del = req => Bagel.remove(req.id).then(() => ({ removed: true }));
const put = req => Bagel.update(req.body);




const methods = { post, get, delete: del, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    return method(req, res);
};