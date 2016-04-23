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
var sessionRoute = require('./routes/session')(router);

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

//// on routes that end in /exercise
//// ----------------------------------------------------
//router.route('/exercise')
//
//    // create an exericse (accessed at POST http://localhost:8080/api/v1/exercise)
//    .post(function(req, res) {
//        var exercise = new Exercise();      // create a new instance of the Exercise model
//        // @TODO The data with the post is messed up
//        for (first in req.body) break;
//        var data = JSON.parse(first);
//        exercise.name = data.exercise.name;
//        exercise.userId = data.userId;
//
//        // save the exercise and check for errors
//        exercise.save(function(err) {
//            if (err)
//                res.send(err);
//
//            res.json({ message: 'Exercise created!' });
//        })
//
//    })
//
//router.route('/exercise/:user_id')
//  .get(function(req, res) {
//    Exercise.find({userId: req.params.user_id}, function(err, exercises) {
//      if(err)
//        res.send(err);
//      res.json(exercises);
//    });
//  })
//
//// on routes that end in /exercises/:exercise_id
//// ----------------------------------------------------
//router.route('/exercises/:exercise_id')
//
//    // get the exercise with that id (accessed at GET http://localhost:8080/api/exercises/:exercise_id)
//    .get(function(req, res) {
//        Exercise.findById(req.params.exercise_id, function(err, exercise) {
//            if (err)
//                res.send(err);
//            res.json(exercise);
//        });
//    })
//        // update the exercise with this id (accessed at PUT http://localhost:8080/api/exercises/:exercise_id)
//    .put(function(req, res) {
//
//        // use our exercise model to find the exercise we want
//        Exercise.findById(req.params.exercise_id, function(err, exercise) {
//
//            if (err)
//                res.send(err);
//
//            exercise.name = req.body.name;  // update the exercises info
//
//            // save the exercise
//            exercise.save(function(err) {
//                if (err)
//                    res.send(err);
//
//                res.json({ message: 'Exercise updated!' });
//            });
//
//        });
//    })
//
//    // delete the exercise with this id (accessed at DELETE http://localhost:8080/api/exercises/:exercise_id)
//

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);


// START THE SERVER
// =============================================================================
app.listen(port);
// console.log('Magic happens on port ' + port);
