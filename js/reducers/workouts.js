import { reciveWorkouts, createWorkout, removeWorkout } from '../api';
import _ from 'lodash';
import { errorMessage, defaultError, success } from '../error_handling';
import { MessageBarManager } from 'react-native-message-bar';
import { loadExercisesByUser } from './exercises';

const RECIVED_WORKOUTS = 'RECIVED_WORKOUTS';
const REQUEST_WORKOUTS = 'REQUEST_WORKOUTS';
const ADD_EXERCISE_SESSION = 'ADD_EXERCISE_SESSION';
const REMOVE_EXERCISE_SESSION = 'REMOVE_EXERCISE_SESSION';
const WORKOUT_CREATED = 'WORKOUT_CREATED';
const DELETE_WORKOUT = 'DELETE_WORKOUT';
const SET_WORKOUT_DATE = 'SET_WORKOUT_DATE';

const initialState = {
  items: [],
  isFetching: false,
  currentSessions: [],
  currentDate: new Date()
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
        currentSessions: [],
        currentDate: new Date()
      }

    case SET_WORKOUT_DATE:
      return {
        ...state,
        currentDate: action.date
      }

    case DELETE_WORKOUT: {
      return {
        ...state,
        items: [
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1)
        ]
      }
    }
    default:
      return state
  }

  return state;
}

export function setWorkoutDate(date) {
  return {
    type: SET_WORKOUT_DATE,
    date: date
  }
}

export function refreshWorkouts() {
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

function fetchWorkouts() {
  return(dispatch, getState) => {
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
      dispatch(fetchWorkouts());
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
        dispatch(fetchWorkouts());
        dispatch(loadExercisesByUser());

        dispatch({
          type: WORKOUT_CREATED
        });

        success('Workout created');
      })
      .catch((err) => errorMessage(err))
  }
}

export function deleteWorkout(workoutId) {
  return (dispatch, getState) => {
    const { workouts } = getState();

    removeWorkout(workoutId)
      .then(() => {
        success('Workout removed');
        dispatch({
          type: DELETE_WORKOUT,
          index: _.findIndex(workouts.items, {_id: workoutId})
        });

        dispatch(fetchWorkouts());
        dispatch(loadExercisesByUser());
      })
      .catch(() => errorMessage('Workout could not be deleted'));
  }
}
