import { syncItems } from '../actions/syncActions';
import _ from 'lodash';

// Action key that carries API call info interpreted by this Redux middleware.
export const SYNC = Symbol('Sync')
export const OFFLINE_SYNC_ADD = 'OFFLINE_SYNC_ADD';
export const SET_CONNECTION = 'SET_CONNECTION';
export const OFFLINE_SYNC_REMOVE = 'OFFLINE_SYNC_REMOVE';

export default store => next => action => {
  // If the connection is changed to active start syncing.

  if(action.type === SET_CONNECTION && action.isConnected) {
    const { dispatch } = store;
    dispatch(syncItems());
    return next(action);
  }

  const sync = action[SYNC];
  if (typeof sync === 'undefined') {
    return next(action);
  }

  const { getState, dispatch } = store;
  const { connection, offline } = getState();
  const matchedEntity = (o) => o.entityId == sync.entityId;

  // If we already have a queued reference item remove it and ignore the delete.
  if(offline.filter(matchedEntity).length > 0) {
    dispatch({
      type: OFFLINE_SYNC_REMOVE,
      index: _.findIndex(offline, matchedEntity)
    });
  }
  else {
    next({
      type: OFFLINE_SYNC_ADD,
      [SYNC]: sync
    });

    if(connection) {
      dispatch(syncItems());
    }
  }
  
  next(action);
}