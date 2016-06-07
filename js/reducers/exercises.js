import { successMessage } from '../notifcations';

import {
  NEW_EXERCISE,
  DELETE_EXERCISE,
  SET_EXERCISES_FROM_USER
} from '../actions/exerciseActions';

const initialState = {
  exercisesFromUser: [],
  suggestedExercises: [
    'Bench', 'Squats', 'Deadlifts', 'Overhead press', 'Dips', 'Wheigted dips', 'Barbell row'
  ],
};

export default (state = initialState, action) => {
  switch(action.type) {
  
    case NEW_EXERCISE:
      successMessage('Exercise added');
      return {
        ...state,
        exercisesFromUser: [...state.exercisesFromUser, action.newExercise]
      }

    case DELETE_EXERCISE:
      successMessage('Exercise removed');
      return {
        ...state,
        exercisesFromUser: state.exercisesFromUser.filter(ex => ex._brorId !== action._brorId)
      }

    case SET_EXERCISES_FROM_USER:
      return {
        ...state,
        exercisesFromUser: action.exercises
      }

    default:
      return state
  }
}
