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
      'Host': 'http://localhost:8080',
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
 * Workouts
 */
export function createWorkout(workoutData) {
  const postData = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'http://localhost:8080',
      'timeout': 15000
    },
    body: JSON.stringify(workoutData)
  }
  return fetch(API_PATH + 'add_workout', postData);
}

export function reciveWorkouts(userId) {
  let postData = {
    'method': 'GET',
    'Content-Type': 'application/json',
    'timeout': 15000
  };
  return fetch(API_PATH + 'workouts/' + userId, postData);
}

export function removeWorkout(workoutId) {
  let postData = {
    'method': 'DELETE',
    'timeout': 15000
  };
  return fetch(API_PATH + 'delete_workout/' + workoutId, postData);
}


/**
 * Exercises
 */
export function removeExercise(id) {
  let postData = {
    'method': 'DELETE',
    'timeout': 15000
  };
  return fetch(API_PATH + 'delete_exercise/' + id, postData);
}



export function newExercise(exerciseName,exerciseType, userId) {
  const postData = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'http://localhost:8080',
      'timeout': 15000
    },
    body: JSON.stringify({
      name: exerciseName,
      type: exerciseType,
      userId: userId
    })
  }
  return fetch(API_PATH + 'add_exercise', postData);
}

export function getDetailedInformation(exerciseId) {
  const postData = {
    'method': 'GET',
    'Content-Type': 'application/json',
    'timeout': 15000
  };
  return fetch(API_PATH + 'exercise/' + exerciseId, postData);
}

// Test server
export function testServer() {
  const postData = {
    'method': 'GET',
    'Content-Type': 'application/json',
    'timeout': 15000
  };
  return fetch(API_PATH + 'server_status/', postData);
}
