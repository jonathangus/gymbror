var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ExerciseUnit = require('./exercise_unit');

var WorkoutSchema  = new Schema({
  userId: '',
  date: {type: Date, required: true, default: Date},
  exerciseUnits: [{
    type: Schema.Types.ObjectId,
    ref: 'ExerciseSession'
  }]
});

WorkoutSchema.pre('remove', function(next) {
  this.exerciseUnits.forEach(function(unit) {
      ExerciseUnit.remove({
        _id: unit
      });
  });
  next();
});

module.exports = mongoose.model('Workout', WorkoutSchema);
