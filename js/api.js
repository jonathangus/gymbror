const HOST = __DEV__ ? 'http://localhost:8080': 'http://seedsites.net:9096';
const API_PATH = HOST + '/api/v1/';

/**
 * Returns fetch object.
 * @param url
 * @param method
 * @param body
 * @returns {promise}
 */
export const apiCall = (url, method = 'GET', body) => {
  const postData = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': HOST,
      'timeout': 15000
    }
  }

  if(body) {
    postData.body = JSON.stringify(body);
  }

  return fetch(API_PATH + url, postData);
}

/**
 * Load exercises by userId.
 * @param userId
 * @returns {*}
 */
export const loadExercises = userId => apiCall(`exercises/${userId}`);

/**
 * Load workouts by userId.
 * @param userId
 * @returns {*}
 */
export const loadWorkouts = userId => apiCall(`workouts/${userId}`);

/**
 * Load workouts by userId.
 * @param userId
 * @returns {*}
 */
export const loadSessions = userId => apiCall(`all_sessions/${userId}`);

/**
 * Test the server.
 * @returns {*}
 */
export const testServer = () => apiCall(`server_status`);
