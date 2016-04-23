const API_PATH = 'http://localhost:8080/api/v1/';

/**
 * Workouts
 */
export function createWorkout() {
  let postData = {
    'method': 'POST',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'workout', postData);
}

export function reciveWorkouts(userId) {
  let postData = {
    'method': 'GET',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'workouts/' + userId, postData);
}


/**
 * Exercises
 */
export function removeExercise(id) {
  let postData = {
    'method': 'DELETE',
  };
  return fetch(API_PATH + 'delete_exercise/' + id, postData);
}

export function loadExercises(userId) {
  const postData = {
    'method': 'GET',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'exercises/' + userId, postData);
}

export function newExercise(exerciseName, userId) {
  const postData = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'http://localhost:8080'
    },
    body: JSON.stringify({
      name: exerciseName,
      userId: userId
    })
  }
  return fetch(API_PATH + 'add_exercise', postData);
}

export function getDetailedInformation(exerciseId) {
  const postData = {
    'method': 'GET',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'exercise/' + exerciseId, postData);
}