const notFound = require('./not-found');
const Player = require('../models/player');
const Game = require('../models/game');
const Event = require('../models/event');

const model = { Player, Game, Event };
const key = req => req.key[0].toUpperCase() + req.key.slice(1, req.key.length - 1);



const get = req => req.id ? getOne(req) : getAll(req);
const getOne = req => model[key(req)].findOne(req.id);
const getAll = req => model[key(req)].find(req.query);
const post = req => req.body.length ? postMany(req) : postOne(req);
const postOne = req => model[key(req)].insertOne(req.body);
const postMany = req => model[key(req)].insertMany(req.body);
const put = req => model[key(req)].update(req.body);
const del = req => model[key(req)].remove(req.id);

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = (methods[req.method.toLowerCase()] && model[key(req)]) ? methods[req.method.toLowerCase()] : notFound;

    return method(req, res);
};