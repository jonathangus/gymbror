import React from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import devTools from 'remote-redux-devtools';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import offlineSync from './middleware/offline_sync';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});


const createGymbrorStore = applyMiddleware(thunk, logger, offlineSync)(createStore);

export default function configureStore(cb) {
  const store = autoRehydrate()(createGymbrorStore)(reducers);
  //console.log(AsyncStorage.getAllKeys().done((data) => console.log(data)));
  //AsyncStorage.removeItem('reduxPersist:user')
  persistStore(store, {storage: AsyncStorage}, cb);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
};
