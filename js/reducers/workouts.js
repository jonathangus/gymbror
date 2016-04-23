import { reciveWorkouts, createWorkout } from '../api';
import _ from 'lodash';
import { errorMessage, defaultError } from '../error_handling';
import { MessageBarManager } from 'react-native-message-bar';

const RECIVED_WORKOUTS = 'RECIVED_WORKOUTS';
const REQUEST_WORKOUTS = 'REQUEST_WORKOUTS';
const ADD_EXERCISE_SESSION = 'ADD_EXERCISE_SESSION';
const REMOVE_EXERCISE_SESSION = 'REMOVE_EXERCISE_SESSION';
const WORKOUT_CREATED = 'WORKOUT_CREATED';

const initialState = {
  items: [],
  isFetching: false,
  currentSessions: []
};

export default function workouts(state = initialState, action) {
  switch(action.type) {
    case RECIVED_WORKOUTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.workouts,
      });

    case REQUEST_WORKOUTS:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case ADD_EXERCISE_SESSION:
      return {
        ...state,
        currentSessions: [...state.currentSessions, action.session]
      }

    case REMOVE_EXERCISE_SESSION:
      const trimmedSessions = state.currentSessions.filter(session => session.exerciseId !== action.session.exerciseId);
      return {
        ...state,
        currentSessions: trimmedSessions
      }

    case WORKOUT_CREATED:
      return {
        ...state,
        currentSessions: []
      }
    default:
      return state
  }

  return state;
}

function _fetchWorkouts() {
  return(dispatch, getState) => {
    dispatch({
      type: REQUEST_WORKOUTS
    });
    
    const { user } = getState();
    reciveWorkouts(user.data.userId)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: RECIVED_WORKOUTS,
          workouts: response
        });
      });
  }
}

export function fetchWorkoutsIfNeeded() {
  return (dispatch, getState) => {
    const { workouts } = getState();
    if(workouts.items.length == 0) {
      dispatch(_fetchWorkouts());
    }
  }
}

export function addExerciseSession(sets, exerciseId, userId, name) {
  return (dispatch) => {
    dispatch({
      type: ADD_EXERCISE_SESSION,
      session: {
        sets: sets,
        exerciseId: exerciseId,
        userId: userId,
        name: name
      }
    });
  }
}

export function removeExerciseSession(session) {
  return {
    type: REMOVE_EXERCISE_SESSION,
    session: session
  };
}

export function createNewWorkout(workoutData) {
  return (dispatch) => {
    createWorkout(workoutData)
      .then((response) => response.json())
      .then((response) => {
        dispatch(_fetchWorkouts());
        dispatch({
          type: WORKOUT_CREATED
        });

        MessageBarManager.showAlert({
          title: 'Workout created',
          alertType: 'success',
        });
      })
      .catch((err) => errorMessage(err))
  }
}