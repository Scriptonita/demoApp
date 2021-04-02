import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { v4 as uuidv4 } from 'uuid';
import { status } from '../Utils/constants';
import { toLower } from 'ramda'

const userList = [
    {
        id: uuidv4(),
        username: 'test1',
        password: 'test1',
        balance: 10,  
    },
    {
        id: uuidv4(),
        username: 'test2',
        password: 'test2',
        balance: 5,  
    },
    {
        id: uuidv4(),
        username: 'test3',
        password: 'test3',
        balance: 15,  
    },
];

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  backendSignUpRequest: ['username', 'password'],
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
   
    const exists = users.find(user => user.username === toLower(username));

    if (exists) {
        return state.merge({
            response: {
                status: status.error,
                data: null,
                message: error,
            }
        })
    } 

    const newUserList = [...users, { id: uuidv4(), username, password, balance: 0 }]

    return state.merge({
        response: {
            status: status.success,
            data: [],
            message: success,
        },
        users: newUserList,
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BACKEND_SIGN_UP_REQUEST]: backendSignUpRequest,
});
