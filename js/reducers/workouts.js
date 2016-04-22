const RECIVE_WORKOUTS = 'RECIVE_WORKOUTS';
const REQUEST_WORKOUTS = 'REQUEST_WORKOUTS';

const initialState = {
  items: [],
  isFetching: false
};

export default function workouts(state = initialState, action) {
  return state;
  
  switch(action.type) {
    case RECIVE_WORKOUTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.workouts,
      });

    case REQUEST_WORKOUTS:
      return Object.assign({}, state, {
        isFetching: true,
      });

    default:
      return state
  }

  return state;
}