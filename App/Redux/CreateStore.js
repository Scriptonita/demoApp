import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  middleware.push(logger);

  enhancers.push(applyMiddleware(...middleware));

  const createAppropriateStore = createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  return {
    store,
  };
};
