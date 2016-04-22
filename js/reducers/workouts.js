import { reciveWorkouts } from '../api';

const RECIVED_WORKOUTS = 'RECIVED_WORKOUTS';
const REQUEST_WORKOUTS = 'REQUEST_WORKOUTS';

const initialState = {
  items: [],
  isFetching: false
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