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
            'entered_at': -1
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
      Exercise.findOne({_id: req.params.id}, function(err, exercise) {
        if(err)
          res.send(err);
          var newExercise = exercise.toJSON();
          newExercise.sessions = [
            123123, 1231231, 399123, 1981238
          ];
        res.json(newExercise);
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

  //router.route('/add_session/:exercise_id')
  //  .put(function(req, res) {
  //    Exercise.findById(req.params.exercise_id, function(err, exercise) {
  //      if (err)
  //        res.send(err);
  //      exercise.sessions = exercise.sessions || [];
  //
  //      var session = new ExerciseSession({
  //        userId: req.body.userId,
  //        exerciseId: req.params.exercise_id,
  //        sets: req.body.sets
  //      });
  //
  //      session.save();
  //      exercise.sessions.push(session);
  //
  //      exercise.save(function(err) {
  //        if (err)
  //          res.send(err);
  //
  //        res.json({ message: 'Session added' });
  //      });
  //
  //
  //    });
  //  });

}