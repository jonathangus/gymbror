import { SYNC } from '../middleware/sync';
import { OFFLINE_SYNC_ADD, OFFLINE_SYNC_REMOVE } from '../actions/actionTypes';

export default (state = [], action) =>{
  switch(action.type) {
    case OFFLINE_SYNC_ADD:
      return [...state, action[SYNC]];

    case OFFLINE_SYNC_REMOVE:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

    default:
      return state
  }
}
