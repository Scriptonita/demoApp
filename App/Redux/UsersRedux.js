import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const userList = [
    {
        username: 'test1',
        password: 'test1',
        balance: 10,  
    },
    {
        username: 'test2',
        password: 'test2',
        balance: 5,  
    },
    {
        username: 'test3',
        password: 'test3',
        balance: 15,  
    },
];

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  signUpRequest: ['username', 'password']
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: userList,
  fetching: null,
  payload: null,
  error: null,
  message: null,
  loged: false,
});

/* ------------- Selectors ------------- */

export const UserSelectors = {};

/* ------------- SIGN UP REQUEST ------------- */

export const signUpRequest = (state, {username, password}) => {
    let { data } = state;
    let error = 'El usuario ya existe';
    
    const exists = data.find(user => user.name === username);

    if (exists) {
        return state.merge({ error })
    } 

    return state.merge({
        error: null,
        data: [...data, { username, password, balance: 0 }]})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: signUpRequest,
});
