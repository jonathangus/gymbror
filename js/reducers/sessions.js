import {
  ADD_SESSIONS,
  DELETE_SESSIONS
} from '../actions/actionTypes';

export default sessions = (state = [], action) => {
  switch(action.type) {

    case ADD_SESSIONS:
      return [...state, ...action.sessions]

    case DELETE_SESSIONS:
      var sessionsIds = action.sessions.map(s => s._brorId);
      return state.filter(s => sessionsIds.indexOf(s._brorId) < 0)

    default:
      return state
  }
}