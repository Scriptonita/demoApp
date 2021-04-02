import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { v4 as uuidv4 } from 'uuid';
import { status } from '../Utils/constants';
import * as R from 'ramda'

const userList = [
    {
        id: uuidv4(),
        username: 'test1',
        password: 'test1',
        balance: 10,
        token: null,
    },
    {
        id: uuidv4(),
        username: 'test2',
        password: 'test2',
        balance: 5,  
        token: null,
    },
    {
        id: uuidv4(),
        username: 'test3',
        password: 'test3',
        balance: 15,
        token: null, 
    },
];

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  backendSignUpRequest: ['username', 'password'],
  backendSignInRequest: ['username', 'password'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: userList,
  transfers: [],
  deposit: [],
  fetching: false,
  response: null,
});

/* ------------- Selectors ------------- */

export const BackendSelectors = {
    getResponse: (state) => state.backend.response,
};

/* ------------- SIGN UP REQUEST ------------- */

export const backendSignUpRequest = (state, {username, password}) => {
    const { users } = state;
    const error = 'El usuario ya existe';
    const success = 'El usuario ha sido registrado';
   
    const exists = users.find(user => user.username === R.toLower(username));

    if (exists) {
        return state.merge({
            response: {
                status: status.error,
                data: null,
                message: error,
            }
        })
    } 

    const newUserList = [...users, { id: uuidv4(), username, password, balance: 0, token: null }]

    return state.merge({
        response: {
            status: status.success,
            data: [],
            message: success,
        },
        users: newUserList,
    })
}

const removePassword = (user) => {
    delete user['password']

    return user
}

/* ------------- SIGN IN REQUEST ------------- */

export const backendSignInRequest = (state, {username, password}) => {
    const { users } = state;
    const error = 'Usuario o contraseña incorrecta';
    const success = 'Iniciando sesión';
   
    const userData = users.find(user => user.username === R.toLower(username) && user.password === password);

    if (!userData) {
        return state.merge({
            response: {
                status: status.error,
                data: null,
                message: error,
            }
        })
    } 
    
    const userUpdated = R.mergeRight(userData, { token: uuidv4()});
    const usersList = users.filter(user => user.username !== R.toLower(username));
    
    return state.merge({
        response: {
            status: status.success,
            data: removePassword(userUpdated),
            message: success,
        },
        users: [...usersList, userUpdated],
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BACKEND_SIGN_UP_REQUEST]: backendSignUpRequest,
  [Types.BACKEND_SIGN_IN_REQUEST]: backendSignInRequest,
});
