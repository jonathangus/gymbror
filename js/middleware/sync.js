// Action key that carries API call info interpreted by this Redux middleware.
export const SYNC = Symbol('Sync')
export const OFFLINE_SYNC_ADD = 'OFFLINE_SYNC_ADD';

export default store => next => action => {
  const sync = action[SYNC];
  if (typeof sync === 'undefined') {
    return next(action)
  }

  next({
    type: OFFLINE_SYNC_ADD,
    [SYNC]: sync
  });

  next(action);
}