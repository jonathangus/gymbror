import { loadExercises, newExercise, removeExercise, getDetailedInformation } from '../api';
import { MessageBarManager } from 'react-native-message-bar';
import { errorMessage, defaultError } from '../error_handling';

const initialState = {
  exercisesFromUser: [],
  suggestedExercises: [
    'Bänk', 'Böj', 'Marklyft'
  ],
  loadedExercises: {},
  isLoading: false,
  detailedExercise: null
};

const LOAD_EXERCISES_BY_USER = 'LOAD_EXERCISES_BY_USER';
const LOAD_DETAILED_EXERCISE = 'LOAD_DETAILED_EXERCISE';
const EXERCISE_LOADING_COMPLETE = 'EXERCISE_LOADING_COMPLETE';
const SET_DETAILED_EXERCISE = 'SET_DETAILED_EXERCISE';

export default function exercises(state = initialState, action) {
  switch(action.type) {

    case LOAD_EXERCISES_BY_USER:
      return {
        ...state,
        exercisesFromUser: action.exercises
      }

    case LOAD_DETAILED_EXERCISE:
      return {
        ...state,
        detailedExercise: null,
        isLoading: true
      }

    case EXERCISE_LOADING_COMPLETE:
      return {
        ...state,
        isLoading: false
      }

    case SET_DETAILED_EXERCISE:
      let loadedExercises = state.loadedExercises;
      loadedExercises[action.exercise._id] = action.exercise;

      return {
        ...state,
        isLoading: false,
        detailedExercise: action.exercise,
        loadedExercises: loadedExercises
      }

    default:
      return state
  }

  return state;
}

export function loadDetailExercise(exercise) {
  return(dispatch, getState) => {
    const { exercises } = getState();
    dispatch({
      type: LOAD_DETAILED_EXERCISE
    });

    if(exercises.loadedExercises[exercise._id]) {
      dispatch({
        type: SET_DETAILED_EXERCISE,
        exercise: exercises.loadedExercises[exercise._id]
      });
    }
    else {
      getDetailedInformation(exercise._id)
        .then((response) => response.json())
        .then((response) => {
          dispatch({
            type: SET_DETAILED_EXERCISE,
            exercise: response
          });
        })
        .catch(() => {
          dispatch({
            type: EXERCISE_LOADING_COMPLETE
          })
          defaultError()
        });
    }

  }
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
      .catch(() => errorMessage('Exercise could not be deleted'));
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
      .catch(() => errorMessage('Exercise could not be created'));
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