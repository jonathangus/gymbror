const API_PATH = 'http://localhost:8080/api/v1/';

export function createWorkout() {
  let postData = {
    'method': 'POST',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'workout', postData);
}

export function deleteWorkout(id) {
  let postData = {
    'method': 'DELETE',
  };
  return fetch(API_PATH + 'workout/' + id, postData);
}

export function reciveWorkouts(userId) {
  let postData = {
    'method': 'GET',
    'Content-Type': 'application/json'
  };
  return fetch(API_PATH + 'workouts/' + userId, postData);
}