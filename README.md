MongoDB Full-Stack App
=====
This is an end-to-end (E2E) tested HTTP server written using Node.js, MongoDB, and tested with Mocha/Chai/Chai-HTTP!

## Get Started
1. Fork and clone the repo.
1. Run `npm i` inside the directory to install all the necessary packages.
1. Make your own .env with the correct MongoDB URI and a port of your choice. Look at the `.env.example` file as a guide.
1. Run `npm run test:watch` to run the tests and build the necessary collections in your MongoDB.
1. Run `node server.js` to start the server.
1. Navigate to `localhost:<yourPort>` to get started!

## API
### Paths:
* `/` - response will be an `index.html` file with the data in separate tables.
* `/players/` - response will be an array of player objects. You can use queries to filter specific players.
* `/games/` - response will be an array of game objects.
* `/events/` - response will be an array of event objects.

### Methods:
* `POST` - will post an object
* `GET` - will get all objects or a specified object
* `PUT` - will update a specified object
* `DELETE` - will delete a specified object