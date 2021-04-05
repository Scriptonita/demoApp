import {combineReducers} from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
    backend: require('./BackendRedux').reducer,
    deposits: require('./DepositsRedux').reducer,
    user: require('./UserRedux').reducer,
    transactions: require('./TransactionsRedux').reducer,
});

const createStore = () => {
  let finalReducers = reducers;

  let { store } = configureStore(
    finalReducers,
    rootSaga,
  );

  return store;
};

const store = createStore();

export default store;
