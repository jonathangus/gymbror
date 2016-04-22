import React from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import devTools from 'remote-redux-devtools';
import createLogger from 'redux-logger';


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  devTools()
)(createStore);

export default function configureStore(initialState) {
  return createStore(
    reducers,
    applyMiddleware(thunk, logger)
  )
  // return finalCreateStore(reducers, initialState);
};
