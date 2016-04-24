// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://@localhost:27017/gymbror'); // connect to our database

var Exercise = require('./app/models/exercise');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var workoutRoute = require('./routes/workout')(router);
var exerciseRoute = require('./routes/exercise')(router);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req.originalUrl);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/server_status')
  .get(function (req, res) {
      res.json('Server is up');
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);


// START THE SERVER
// =============================================================================
app.listen(port);
// console.log('Magic happens on port ' + port);
