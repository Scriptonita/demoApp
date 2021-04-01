import {combineReducers} from 'redux';
import configureStore from './CreateStore';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
    users: require('./UsersRedux').reducer,
});

const createStore = () => {
  let finalReducers = reducers;

  let { store } = configureStore(
    finalReducers
  );

  return store;
};

const store = createStore();

export default store;
