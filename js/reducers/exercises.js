import { loadExercises, newExercise, removeExercise } from '../api';
import { MessageBarManager } from 'react-native-message-bar';

const initialState = {
  exercisesFromUser: [],
  suggestedExercises: [
    'Bänk', 'Böj', 'Marklyft'
  ],
};

const LOAD_EXERCISES_BY_USER = 'LOAD_EXERCISES_BY_USER';

export default function exercises(state = initialState, action) {
  switch(action.type) {

    case LOAD_EXERCISES_BY_USER:
      return {
        ...state,
        exercisesFromUser: action.exercises
      }

    default:
      return state
  }

  return state;
}

export function deleteExercise(exercise) {
  return(dispatch) => {
    removeExercise(exercise._id)
      .then(() => {
        dispatch(loadExercisesByUser());
        MessageBarManager.showAlert({
          title: 'Exercise have been deleted',
          alertType: 'success',
        });
      })
      .catch(() => {
        MessageBarManager.showAlert({
          title: 'Exercise could not be deleted',
          alertType: 'error',
        });
      });
  };
}

export function createExercise(exerciseName) {
  return(dispatch, getState) => {
    const { user } = getState();

    newExercise(exerciseName, user.data.userId)
      .then(() => {
        dispatch(loadExercisesByUser());
        MessageBarManager.showAlert({
          title: 'Exercise have been created',
          alertType: 'success',
        });
      })
    .catch(() => {
      MessageBarManager.showAlert({
        title: 'Exercise could not be created',
        alertType: 'error',
      });
    });
  }
}

export function loadExercisesByUser() {
  return (dispatch, getState) => {
    const { user } = getState();
    loadExercises(user.data.userId)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: LOAD_EXERCISES_BY_USER,
          exercises: response
        });
      })
  }
}