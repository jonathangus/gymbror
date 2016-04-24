const API_PATH = 'http://localhost:8080/api/v1/';

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
      'Host': 'http://localhost:8080'
    },
    body: JSON.stringify(workoutData)
  }
  return fetch(API_PATH + 'add_workout', postData);
}

export function reciveWorkouts(userId) {
  let postData = {
    'method': 'GET',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'workouts/' + userId, postData);
}

export function removeWorkout(workoutId) {
  let postData = {
    'method': 'DELETE',
  };
  return fetch(API_PATH + 'delete_workout/' + workoutId, postData);
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