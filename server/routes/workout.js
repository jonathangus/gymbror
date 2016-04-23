var express = require('express');
var Workout = require('../app/models/workout');

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

      if(!req.body.userId && !req.body.exerciseUnits) {
        res.send('Missing data');
        return;
      }
      workout.userId = req.body.userId;
      workout.exerciseUnits = [111, 312312, 'aaa', 12312313];

      workout.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Workout created!' });
      })
  });
  //
  //.delete(function(req, res) {
  //  Workout.remove({
  //    _id: req.params.workout_id
  //  }, function (err) {
  //    if (err) {
  //      res.send(err);
  //    }
  //    res.json({
  //      message: 'Successfully deleted',
  //      success: true
  //    });
  //  });
  //});
  //
  //router.route('/workouts')
  //  .post(function(req, res) {
  //    var workout = new Workout();
  //
  //    workout.exerciseId = req.body.exerciseId;
  //    console.log(req.body.sets);
  //    workout.sets = [
  //      {
  //        value: 10,
  //        completed: true,
  //      },
  //      {
  //        value: 20,
  //        completed: true,
  //      }
  //    ];
  //
  //    workout.save(function(err) {
  //      if (err)
  //        res.send(err);
  //      res.json({
  //        success: true,
  //        message: 'Workout created!',
  //        data: workout
  //      });
  //    })
  //  });

}