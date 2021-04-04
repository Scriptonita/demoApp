import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getTransactionsRequest: ['userId'],
  getTransactionsSuccess: ['data'],
  getTransactionsFailure: ['error'],
  makeTransactionRequest: ['userId', 'toUsername', 'quantity'],
  makeTransactionSuccess: ['message'],
  makeTransactionFailure: ['error'],
  clearMessage: null,
});

export const TransactionsTypes = Types;
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

export const TransactionsSelectors = {};

/* ------------- TRANSACTIONS REQUEST ------------- */

// eslint-disable-next-line no-unused-vars
export const getTransactionsRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null,
    message: null
  })
};

export const getTransactionsSuccess = (state, { data }) => {
  return state.merge({ fetching: false, data })
};

export const getTransactionsFailure = (state, { error }) => {
  return state.merge({ fetching: false, error })
};

/* ------------- CLEAR MESSAGE ------------- */

// eslint-disable-next-line no-unused-vars
export const clearMessage= (state, { error }) => {
  return state.merge({ message: null, error: null })
};

/* ------------- MAKE TRANSACTION REQUEST ------------- */

// eslint-disable-next-line no-unused-vars
export const makeTransactionRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null,
    message: null
  })
};

export const makeTransactionSuccess = (state, { message }) => {
  return state.merge({ fetching: false, message })
};

export const makeTransactionFailure = (state, { error }) => {
  return state.merge({ fetching: false, error })
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TRANSACTIONS_REQUEST]: getTransactionsRequest,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,
  [Types.CLEAR_MESSAGE]: clearMessage,
  [Types.MAKE_TRANSACTION_REQUEST]: makeTransactionRequest,
  [Types.MAKE_TRANSACTION_SUCCESS]: makeTransactionSuccess,
  [Types.MAKE_TRANSACTION_FAILURE]: makeTransactionFailure,
});
