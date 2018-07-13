const notFound = require('./not-found');
const Fruit = require('../models/fruit');

cosnt get = ({ id }) => id ? getOne(id) : getAll();