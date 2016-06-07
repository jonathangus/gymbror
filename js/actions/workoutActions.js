import { SYNC } from '../middleware/sync';
import { generate } from 'shortid';
import {
  ADD_SESSIONS,
  ADD_WORKOUT,
  DELETE_SESSIONS,
  DELETE_WORKOUT
} from './actionTypes';

/**
 * Create workout
 * @param workoutData
 */
export const createWorkout = workoutData => dispatch => {
  workoutData._brorId = generate();

  dispatch({
    type: ADD_SESSIONS,
    sessions: workoutData.sessions,
  });

  dispatch({
    type: ADD_WORKOUT,
    newWorkout: workoutData,
    [SYNC]: {
      method: 'POST',
      path: 'add_workout',
      body: workoutData,
      entityId: workoutData._brorId
    }
  })
}

/**
 * Delete workout.
 * @param workoutData
 */
export const deleteWorkout = workoutData => dispatch => {
  dispatch({
    type: DELETE_WORKOUT,
    workoutData: workoutData,
    [SYNC]: {
      method: 'DELETE',
      path: 'delete_workout',
      body: workoutData,
      entityId: workoutData._brorId
    }
  });

  dispatch({
    type: DELETE_SESSIONS,
    sessions: workoutData.sessions
  });
};
