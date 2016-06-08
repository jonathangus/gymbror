import { SET_USER , LOGOUT_USER } from '../actions/actionTypes';

const intialState = {
  data: null,
  isLoggedIn: false
}

export const setUser = data => ({
  type: SET_USER,
  data: data
});

export const logoutUser = data => ({
  type: LOGOUT_USER,
  data: data
});

export default (state = initialState, action = {}) => {
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
