const HOST = __DEV__ ? 'http://localhost:8080': 'http://10.0.1.164:8080';
//const HOST = 'http://10.0.1.164:8080';
// const HOST = 'http://192.168.20.184:8080';
const API_PATH = HOST + '/api/v1/';


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

export function loadExercises(userId) {
  const postData = {
    'method': 'GET',
    'Content-Type': 'application/json',
    'timeout': 15000
  };
  return fetch(API_PATH + 'exercises/' + userId, postData);
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