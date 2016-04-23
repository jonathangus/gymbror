var express = require('express');
var Workout = require('../app/models/workout');
var ExerciseSession = require('../app/models/exercise_unit');

module.exports = function(router) {
  router.route('/workouts/:user_id')
    .get(function (req, res) {
      Workout.find({userId: req.params.user_id}, function (err, workouts) {
        if (err)
          res.send(err);
        res.json(workouts);
      });
    });

  router.route('/add_workout')
    .post(function(req, res) {
      var workout = new Workout();

      workout.date = req.body.date;
      workout.userId = req.body.userId;
      workout.exerciseUnits = [];

      req.body.sessions.forEach(function(session) {
        var sezch = new ExerciseSession({
          userId: session.userId,
          exerciseId: session.exerciseId,
          sets: session.sets,
          date: req.body.date
        });

        sezch.save();
        workout.exerciseUnits.push(sezch);
      });

      workout.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Workout created!' });
      })
  });

}