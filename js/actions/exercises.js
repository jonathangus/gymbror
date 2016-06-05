
export function createExercise(exerciseName, exerciseType) {
  return(dispatch, getState) => {
    const { user } = getState();

    newExercise(exerciseName, exerciseType, user.data.userId)
      .then(() => {
        dispatch(loadExercisesByUser());
        MessageBarManager.showAlert({
          title: 'Exercise have been created',
          alertType: 'success',
        });
      })
      .catch(() => errorMessage('Exercise could not be created'));
  }
}
