import { SYNC } from '../middleware/sync';
import { generate } from 'shortid';

export const EXERCISES_REQUEST = 'EXERCISES_REQUEST'
const NEW_EXERCISE = 'NEW_EXERCISE';

export const createExercise = (exerciseName, exerciseType) => {

  const { user } = getState();

  const newExercise = {
    name: exerciseName,
    type: exerciseType,
    userId: user.data.userId,
    _id: generate(),
    sessions: [],
    isSynced: false
  };

  return {
    type: NEW_EXERCISE,
    newExercise: newExercise,
    [SYNC]: {
      method: 'get',
      path: '/asdadasd'
    }
  }
}

//export function createExercise(exerciseName, exerciseType) {
//  return(dispatch, getState) => {
//    const { user } = getState();
//
//    newExercise(exerciseName, exerciseType, user.data.userId)
//      .then(() => {
//        dispatch(loadExercisesByUser());
//        MessageBarManager.showAlert({
//          title: 'Exercise have been created',
//          alertType: 'success',
//        });
//      })
//      .catch(() => errorMessage('Exercise could not be created'));
//  }
//}
