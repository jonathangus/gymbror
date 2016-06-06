// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API];
  
  console.log(action);

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types } = callAPI;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types;
  console.log(actionWith({ type: requestType }));

  next(actionWith({ type: requestType }))
}