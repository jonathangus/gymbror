import { OFFLINE_SYNC_ADD, SYNC } from '../middleware/sync';

export default function offline(state = [], action) {
  switch(action.type) {
    case OFFLINE_SYNC_ADD:
      return [...state, action[SYNC]]

    default:
      return state
  }
}