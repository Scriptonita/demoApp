import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  signUpRequest: ['username', 'password'],
  signUpSuccess: ['message'],
  signUpFailure: ['error'],
  clearMessage: null,
  signInRequest: ['username', 'password'],
  signInSuccess: ['data', 'message'],
  signInFailure: ['error'],
  updateUserData: ['data'],
  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: null,
  error: null,
  message: null,
  logged: false,
});

/* ------------- Selectors ------------- */

export const UserSelectors = {};

/* ------------- SIGN UP REQUEST ------------- */

// eslint-disable-next-line no-unused-vars
export const signUpRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null, 
    logged: false, 
    message: null
  })
};

export const signUpSuccess = (state, { message }) => {
  return state.merge({ fetching: false, message })
};

export const signUpFailure = (state, { error }) => {
  return state.merge({ fetching: false, error })
};

/* ------------- CLEAR MESSAGE ------------- */

// eslint-disable-next-line no-unused-vars
export const clearMessage= (state, { error }) => {
  return state.merge({ message: null, error: null })
};

/* ------------- SIGN IN REQUEST ------------- */

// eslint-disable-next-line no-unused-vars
export const signInRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null, 
    logged: false, 
    message: null
  })
};

export const signInSuccess = (state, { data, message }) => {
  return state.merge({ fetching: false, data, message, logged: true })
};

export const signInFailure = (state, { error }) => {
  return state.merge({ fetching: false, error })
};

/* ------------- UPDATE USER DATA ------------- */

export const updateUserData = (state, { data }) => {
  return state.merge({ data })
}

/* ------------- LOGOUT ------------- */

// eslint-disable-next-line no-unused-vars
export const logoutRequest = (state, action) => {
  return state.merge({ 
    data: null,
    fetching: true, 
    payload: null,
    error: null, 
    logged: false, 
    message: null
   })
}

// eslint-disable-next-line no-unused-vars
export const logoutSuccess = (state, action) => {
  return state;
}

// eslint-disable-next-line no-unused-vars
export const logoutFailure = (state, action) => {
  return state;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,
  [Types.CLEAR_MESSAGE]: clearMessage,
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,
  [Types.UPDATE_USER_DATA]: updateUserData,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure,
});
