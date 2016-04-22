var express = require('express');
var Workout = require('../app/models/workout');
var Exercise = require('../app/models/exercise');

module.exports = function(router) {
  router.route('/workouts/:exercise_id')
    .get(function(req, res) {
      Workout.find({exerciseId: req.params.exercise_id}, function (err, workouts) {
        if (err)
          res.send(err);
        res.json(workouts);
      });
    })

  .delete(function(req, res) {
    Workout.remove({
      _id: req.params.workout_id
    }, function (err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Successfully deleted',
        success: true
      });
    });
  });

  router.route('/workouts')
    .post(function(req, res) {
      var workout = new Workout();

      workout.exerciseId = req.body.exerciseId;
      console.log(req.body.sets);
      workout.sets = [
        {
          value: 10,
          completed: true,
        },
        {
          value: 20,
          completed: true,
        }
      ];

      workout.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          success: true,
          message: 'Workout created!',
          data: workout
        });
      })
    });

}