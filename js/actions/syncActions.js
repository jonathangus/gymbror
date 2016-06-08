import { apiCall, loadExercises, loadWorkouts } from '../api';
import {
  SET_EXERCISES_FROM_USER,
  OFFLINE_SYNC_REMOVE,
  RECIVED_WORKOUTS
} from './actionTypes';

/**
 * Action for removing a offline item.
 */
const removeOfflineItem = (index = 0) => ({
  type: OFFLINE_SYNC_REMOVE,
  index: index
});

/**
 * Sync queued offline items.
 */
export const syncItems = () => (dispatch, getState) => {
  const { offline, connection } = getState();
  // Return if there is not items
  if(!connection || offline.length == 0) return;

  (async () => {
    let promises = [];

    // Create a promise for each offline item.
    for(var key in offline) {
      var item = offline[key];
      promises.push(await (await apiCall(item.path, item.method, item.body)).json());
    }

    // When the request have been done dispatch a action that remove each item.
    Promise.all(promises).then((responses) => {
      responses.forEach((response, key) => {
        if(response.success) dispatch(removeOfflineItem(key));
      });
    });

  })();
}

/**
 * Load data for our three entities.
 */
export const syncDataFromServer = () => (dispatch, getState) => {
  const { offline, user: { data: { userId } } } = getState();

  // Don't load data from the server if we still got items queued.
  if(offline.length > 0) return;

  loadExercises(userId)
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: SET_EXERCISES_FROM_USER,
        workouts: response
      });
    });

  loadWorkouts(userId)
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: RECIVED_WORKOUTS,
        workouts: response
      });
    });
}
