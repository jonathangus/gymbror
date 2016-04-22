const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function setUser() {

}

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}