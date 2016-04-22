import workouts from './workouts';
import user from './user';
import { combineReducers } from 'redux';

export default combineReducers({
  workouts,
  user
});

