var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WorkoutSchema  = new Schema({
  sets: [{
    value: Number,
    completed: Boolean
  }],
  exerciseId: String,
  entered_at: {type: Date, required: true, default: Date}
});

module.exports = mongoose.model('Workout', WorkoutSchema);
