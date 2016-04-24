var express = require('express');
var Exercise = require('../app/models/exercise');
var ExerciseSession = require('../app/models/exercise_unit');

module.exports = function(router) {
  router.route('/exercises/:user_id')
    .get(function(req, res) {
      Exercise
        .find({userId: req.params.user_id})
        .populate({path: 'sessions', options: {
          sort : {
            'date': -1
          }
        }})
        .exec(function(err, exercises) {
          if(err) {
            res.send(err);
          }
          res.json(exercises);
        });
    });

  router.route('/exercise/:id')
    .get(function(req, res) {
      Exercise
        .findOne({_id: req.params.id})
        .populate({path: 'sessions', options: {
          sort : {
            'date': -1
          }
        }})
        .exec(function(err, exercises) {
          if(err) {
            res.send(err);
          }
          res.json(exercises);
        });
    });

  router.route('/add_exercise')
    .post(function(req, res) {
      var exercise = new Exercise();

      if(!req.body.name || !req.body.userId) {
        res.send('Missing data');
        return;
      }

      exercise.name = req.body.name;
      exercise.userId = req.body.userId;

      exercise.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Exercise created!' });
      })
    });

  router.route('/delete_exercise/:exercise_id')
    .delete(function(req, res) {
        Exercise.remove({
            _id: req.params.exercise_id
        }, function(err, exercise) {
            if (err) {
              res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

}