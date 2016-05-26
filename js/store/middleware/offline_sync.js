import { NEW_EXERCISE } from '../../reducers/exercises';
import { addExercise } from '../../reducers/offline';

export default function offlineSync(middlewareAPI){
  return (next) => {
    return (action) => {
      const { dispatch, getState } = middlewareAPI;

      switch(action.type) {
        case NEW_EXERCISE:
          dispatch(addExercise(action.newExercise));
          return next(action)

        default:
          return next(action)

      }
    }
  }
}
