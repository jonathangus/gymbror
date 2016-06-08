import {
  ADD_SESSIONS,
  DELETE_SESSIONS,
  SET_SESSIONS_FROM_USER
} from '../actions/actionTypes';

export default (state = [], action) => {
  switch(action.type) {

    case ADD_SESSIONS:
      return [...state, ...action.sessions]

    case DELETE_SESSIONS:
      var sessionsIds = action.sessions.map(s => s._brorId);
      return state.filter(s => sessionsIds.indexOf(s._brorId) < 0)

    case SET_SESSIONS_FROM_USER:
      return [...action.sessions];

    default:
      return state
  }
}
