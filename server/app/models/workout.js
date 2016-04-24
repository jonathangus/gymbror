var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ExercuseUnit = require('./exercise_unit');

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
    if(unit._id) {
      ExercuseUnit.remove({
        _id: unit._id
      });
    }
  });
  next();
});

module.exports = mongoose.model('Workout', WorkoutSchema);
