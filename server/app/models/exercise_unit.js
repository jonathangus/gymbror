var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExerciseSessionSchema = new Schema({
  userId: Number,
  exerciseId: String,
  sets: Array,
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  date: {type: Date, required: true, default: Date},
});

module.exports = mongoose.model('ExerciseSession', ExerciseSessionSchema);
