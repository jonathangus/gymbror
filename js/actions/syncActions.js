import { apiCall } from '../api';
import  { OFFLINE_SYNC_REMOVE } from '../middleware/sync';

const removeOfflineItem = (index = 0) => ({
  type: OFFLINE_SYNC_REMOVE,
  index: index
});


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
  })()
}

// export const syncDataFromServer = () => (dispatch, getState) => {
//   const { connection } = getState();
//   // Return if there is not items
//   if(connection) return;
//
//   (async () => {
//
//     // When the request have been done dispatch a action that remove each item.
//     Promise.all(promises).then((responses) => {
//       responses.forEach((response, key) => {
//         if(response.success) dispatch(removeOfflineItem(key));
//       });
//     });
//   })()
// }
