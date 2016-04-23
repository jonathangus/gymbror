var express = require('express');
var ExerciseSession = require('../app/models/exercise_unit');

module.exports = function(router) {
  router.route('/add_session')
    .post(function(req, res) {
      var session = new ExerciseSession();
      if(!req.body.exerciseId || !req.body.userId || !req.body.sets) {
        res.send('Missing data');
        return;
      }

      session.userId = req.body.userId;
      session.sets = req.body.sets;
      session.exerciseId = req.body.exerciseId;

      session.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Session created!' });
      })
    });
}