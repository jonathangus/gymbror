import { loadExercises } from '../api';

const initialState = {
  exercisesFromUser: [],
  suggestedExercises: [
    'Bänk', 'Böj', 'Marklyft'
  ]
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