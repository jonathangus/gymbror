import workouts from './workouts';
import user from './user';
import exercises from './exercises';
import offline from './offline';

import { combineReducers } from 'redux';

export default combineReducers({
  workouts,
  user,
  exercises,
  offline
});

