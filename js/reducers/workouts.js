import _ from 'lodash';
import { successMessage } from '../notifcations';

import {
  ADD_WORKOUT,
  DELETE_WORKOUT,
  RECIVED_WORKOUTS,
  ADD_SESSION_TO_WORKOUT,
  REMOVE_SESSION_FROM_WORKOUT,
  SET_WORKOUT_DATE,
  WORKOUT_CREATED,
  REQUEST_WORKOUTS,
  REQUEST_WORKOUTS_ABANDON,
  UPDATE_SESSION_IN_WORKOUT
} from '../actions/actionTypes';

const initialState = {
  items: [],
  isFetching: false,
  currentSessions: [],
  currentDate: new Date(),
  localItems: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_WORKOUT:
      return {
        ...state,
        items: [...state.items, action.newWorkout],
        currentSessions: [],
        currentDate: new Date()
      }

    case DELETE_WORKOUT:
      var index = _.findIndex(state.items, {_brorId: action.workoutData._brorId});
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ]
      }

    case REQUEST_WORKOUTS:
      return {
        ...state,
        isFetching: true,
      }

    case REQUEST_WORKOUTS_ABANDON:
      return {
        ...state,
        isFetching: false
      }

    case RECIVED_WORKOUTS:
      return {
        ...state,
        isFetching: false,
        items: action.workouts
      }

    case ADD_SESSION_TO_WORKOUT:
      return {
        ...state,
        currentSessions: [...state.currentSessions, action.session]
      }

    case REMOVE_SESSION_FROM_WORKOUT:
      return {
        ...state,
        currentSessions: state.currentSessions.filter(session => session._exerciseId !== action.session._exerciseId)
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

    case UPDATE_SESSION_IN_WORKOUT:
      let updatedSessions = [...state.currentSessions];
      let index = _.findIndex(updatedSessions, {_exerciseId: action.session._exerciseId});
      updatedSessions[index] = action.session;

      return {
        ...state,
        currentSessions: updatedSessions
      }

    default:
      return state
  }

  return state;
}
