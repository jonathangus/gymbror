const initialState = {
  exercises: [],
  workouts: []
};

const ADD_EXERCISE = 'ADD_EXERCISE';

export default function offline(state = initialState, action) {
  switch(action.type) {

    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.exerciseItem]
      }

    default:
      return state
  }

}

export function addExercise(exerciseItem) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_EXERCISE,
      exerciseItem: exerciseItem
    });
  }
}