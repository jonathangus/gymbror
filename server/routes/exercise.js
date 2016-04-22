var express = require('express');
var Exercise = require('../app/models/exercise');

module.exports = function(router) {
  router.route('/exercises/:user_id')
  .get(function(req, res) {
    Exercise.find({userId: req.params.user_id}, function(err, exercises) {
      if(err)
        res.send(err);
      res.json(exercises);
    });
  })

}