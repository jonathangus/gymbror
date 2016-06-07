import workouts from './workouts';
import user from './user';
import exercises from './exercises';
import offline from './offline';
import connection from './connection';
import sessions from './sessions';

import { combineReducers } from 'redux';

export default combineReducers({
  workouts,
  user,
  exercises,
  offline,
  connection,
  sessions
});

