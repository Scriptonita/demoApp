import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getDepositsRequest: ['userId'],
  getDepositsSuccess: ['data'],
  getDepositsFailure: ['error'],
  makeDepositRequest: ['userId', 'quantity', 'depositType'],
  makeDepositSuccess: ['message'],
  makeDepositFailure: ['error'],
  clearMessage: null,
  clearStore: null,
});

export const DepositsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: null,
  error: null,
  message: null,
});

/* ------------- Selectors ------------- */

export const DepositsSelectors = {};

/* ------------- DEPOSITS REQUEST ------------- */

// eslint-disable-next-line no-unused-vars
export const getDepositsRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null,
    message: null
  })
};

export const getDepositsSuccess = (state, { data }) => {
  return state.merge({ fetching: false, data })
};

export const getDepositsFailure = (state, { error }) => {
  return state.merge({ fetching: false, error })
};

/* ------------- CLEAR MESSAGE ------------- */

// eslint-disable-next-line no-unused-vars
export const clearMessage= (state, { error }) => {
  return state.merge({ message: null, error: null })
};

/* ------------- MAKE DEPOSITS REQUEST ------------- */

// eslint-disable-next-line no-unused-vars
export const makeDepositRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null,
    message: null
  })
};

export const makeDepositSuccess = (state, { message }) => {
  return state.merge({ fetching: false, message })
};

export const makeDepositFailure = (state, { error }) => {
  return state.merge({ fetching: false, error })
};

/* ------------- CLEAR STORE ------------- */
// eslint-disable-next-line no-unused-vars
export const clearStore= (state, action) => {
  return state.merge({ 
    data: null,
    fetching: false,
    payload: null,
    error: null,
    message: null,
  })
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DEPOSITS_REQUEST]: getDepositsRequest,
  [Types.GET_DEPOSITS_SUCCESS]: getDepositsSuccess,
  [Types.GET_DEPOSITS_FAILURE]: getDepositsFailure,
  [Types.CLEAR_MESSAGE]: clearMessage,
  [Types.MAKE_DEPOSIT_REQUEST]: makeDepositRequest,
  [Types.MAKE_DEPOSIT_SUCCESS]: makeDepositSuccess,
  [Types.MAKE_DEPOSIT_FAILURE]: makeDepositFailure,
  [Types.CLEAR_STORE]: clearStore,
});
