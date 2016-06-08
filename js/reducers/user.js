import { SET_USER , LOGOUT_USER } from '../actions/actionTypes';

const intialState = {
  data: null,
  isLoggedIn: false
}


export function setUser(data) {
  return (dispatch) => {
    return dispatch({
      type: SET_USER,
      data: data
    });
  }
}

export function logoutUser() {
  return (dispatch) => {
    return dispatch({
      type: LOGOUT_USER,
    })
  }
}

export default function user(state = intialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.data,
        isLoggedIn: true
      }
    case LOGOUT_USER:
      return {
        ...state,
        data: null,
        isLoggedIn: false
      }
    default:
      return state;
  }
}
