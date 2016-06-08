import { SYNC } from '../middleware/sync';
import { uuid } from '../util';
import { loadWorkouts } from '../api';
import {
  ADD_SESSIONS,
  ADD_WORKOUT,
  DELETE_SESSIONS,
  DELETE_WORKOUT,
  REMOVE_SESSION_FROM_WORKOUT,
  SET_WORKOUT_DATE,
  REQUEST_WORKOUTS,
  RECIVED_WORKOUTS,
  REQUEST_WORKOUTS_ABANDON,
  ADD_SESSION_TO_WORKOUT,
  UPDATE_SESSION_IN_WORKOUT
} from './actionTypes';

/**
 * Create workout
 * @param workoutData
 */
export const createWorkout = workoutData => dispatch => {
  workoutData._brorId = uuid();

  // Pick out the sessions and put in a seprate state.
  dispatch({
    type: ADD_SESSIONS,
    sessions: workoutData.sessions,
  });

  // We want to pass sessions in the workout object to the server but not store it.
  const trimmedWorkoutData = Object.assign({}, workoutData);
  delete workoutData.sessions;

  // Add workout to our state and add sync object to the queue.
  dispatch({
    type: ADD_WORKOUT,
    newWorkout: trimmedWorkoutData,
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
  // Delete this workout and add a sync object to the queque.
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

  // Delete the sessions for this workout.
  dispatch({
    type: DELETE_SESSIONS,
    sessions: workoutData.sessions
  });
};

/**
 * Remove session from the new workout.
 */
export const removeExerciseSession = (session) => ({
  type: REMOVE_SESSION_FROM_WORKOUT,
  session: session
});

/**
 * Add session to the new workout.
 */
export const addExerciseSession = (session) => ({
 type: ADD_SESSION_TO_WORKOUT,
 session: session
});

/**
 * Add session to the new workout.
 */
export const editExerciseSession = (session) => ({
  type: UPDATE_SESSION_IN_WORKOUT,
  session: session
});

/**
  * Change the date for the new workout.
  */
 export const setWorkoutDate = (date) => ({
   type: SET_WORKOUT_DATE,
   date: date
 });

 /**
   * Change the date for the new workout.
   */
  export const refreshWorkouts = (date) => (dispatch, getState) => {
    const { user: { data: { userId } } } = getState();

    dispatch({
      type: REQUEST_WORKOUTS
    });

    loadWorkouts(userId)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: RECIVED_WORKOUTS,
          workouts: response
        });
      })
      .catch(() => dispatch({type: REQUEST_WORKOUTS_ABANDON}))

  }
