import { SYNC } from '../middleware/sync';
import { uuid } from '../util';
import { loadExercises } from '../api';
import _ from 'lodash';

import {
  DELETE_EXERCISE,
  NEW_EXERCISE,
  SET_EXERCISES_FROM_USER,
} from './actionTypes';

/**
 * Create new exercise.
 * @param exerciseName
 * @param exerciseType
 * @returns {Function}
 */
export const createExercise = (exerciseName, exerciseType) => (dispatch, getState) => {
  const { user } = getState();

  const newExercise = {
    exerciseName: exerciseName,
    type: exerciseType,
    userId: user.data.userId,
    _brorId: uuid(),
    sessions: [],
  };

  dispatch({
    type: NEW_EXERCISE,
    newExercise: newExercise,
    [SYNC]: {
      method: 'POST',
      path: 'add_exercise',
      body: newExercise,
      entityId: newExercise._brorId
    }
  });
}

/**
 * Delete exercise.
 * @param exercise
 * @returns {{type: string, _brorId: *}}
 */
export const deleteExercise = (exercise) => {
  return {
    type: DELETE_EXERCISE,
    _brorId: exercise._brorId,
    [SYNC]: {
      method: 'DELETE',
      path: `delete_exercise/${exercise._brorId}`,
      entityId: exercise._brorId
    }
  }
}

/**
 * Load exercises by user.
 * @returns {Function}
 */
export const loadExercisesByUser = () => (dispatch, getState) => {
  const { user, offline } = getState();
  // We don't want to load exercises if our exercises are not synced
  if(offline.length > 0) return;

  loadExercises(user.data.userId)
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: SET_EXERCISES_FROM_USER,
        exercises: response
      });
    });
}
