const { parse } = require('url');
const players = require('./routes/players');
const games = require('./routes/games');
const notFound = require('./routes/not-found');
const bodyParser = require('./body-parser');

const routes = {
    players,
    games
};

module.exports = (req, res) => {
    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.paths = parsedUrl.pathname.slice(1).split('/');
    const key = req.paths[0];
    req.id = req.paths[1];

    res.setHeader('Content-Type', 'application/json');
    res.send = obj => res.end(JSON.stringify(obj));

    const route = routes[key] || notFound;


    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res)
                .then((data) => res.send(data))
                .catch(err => {
                    console.log(err);
                    res.statusCode = err.statusCode || 500;
                    res.send({
                        error: err.statusCode ? err.message : 'An unexpected error occurred.'
                    });
                });
        });
    
    
};