import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { v4 as uuidv4 } from 'uuid';
import { status } from '../Utils/constants';
import { userList, transactions } from '../Utils/mockData';
import * as R from 'ramda'

/* ------------- Types and Action Creators ------------- */
const unknown = 'desconocido';

const {Types, Creators} = createActions({
  backendSignUpRequest: ['username', 'password'],
  backendSignInRequest: ['username', 'password'],
  backendTransactionsRequest: ['userId'],
  backendMakeTransferRequest: ['userId', 'toUsername', 'quantity'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: userList,
  transfers: transactions,
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
    const data = {
        id: userUpdated.id,
        username: userUpdated.username,
        balance: userUpdated.balance,
        token: userUpdated.token,
    }
    
    return state.merge({
        response: {
            status: status.success,
            data,
            message: success,
        },
        users: [...usersList, userUpdated],
    })
}

/* ------------- GET TRANSACTIONS REQUEST ------------- */

export const backendTransactionsRequest = (state, {userId}) => {
    const { transfers, users } = state;
    // const userHistory = transfers.filter(transaction => transaction.from === userId || transaction.to === userId);

    let userHistory = [];

    transfers.forEach(transfer => {
        if (transfer.from === userId || transfer.to === userId) {
            const fromUser = users.find(user => user.id === transfer.from);
            const toUser = users.find(user => user.id === transfer.to);

            userHistory.push({
                quantity: transfer.quantity,
                from: fromUser?.username || unknown,
                to: toUser?.username || unknown,
            })
        }
    });

    console.log("USERHISTORY: ", userHistory)

    return state.merge({
        response: {
            status: status.success,
            data: userHistory,
            message: null,
        }
    })
}

/* -------------MAKE TRANSACTION REQUEST ------------- */

export const backendMakeTransferRequest = (state, action) => {
    const {userId, toUsername, quantity} = action;
    const {users, transfers} = state;
    const error = 'El usuario indicado no existe';
    const success = 'La transferencia se ha realizado con éxito';
    
    const userToSendTransfer = users.find(user => user.username === R.toLower(toUsername));

    if (!userToSendTransfer) {
        return state.merge({
            response: {
                status: status.error,
                data: null,
                message: error,
            }
        })
    }

    const userHowMakeTransfer = users.find(user => user.id === userId);
    const userToSendTransferUpdated = R.mergeRight(userToSendTransfer, { balance: parseFloat(userToSendTransfer.balance) + parseFloat(quantity) });
    const userHowMakeTransferUpdated = R.mergeRight(userHowMakeTransfer, { balance: parseFloat(userHowMakeTransfer.balance) - parseFloat(quantity) });
    const newTransfer = {
        id: uuidv4(),
        from: userHowMakeTransfer.id,
        to: userToSendTransfer.id,
        quantity,
    };
    const userList = users.filter(user => user.id !== userHowMakeTransfer.id && user.id !== userToSendTransfer.id);

    return state.merge({
        response: {
            status: status.success,
            data: userHowMakeTransferUpdated,
            message: success,
        },
        transfers: [ ...transfers, newTransfer ],
        users: [...userList, userHowMakeTransferUpdated, userToSendTransferUpdated],
    });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BACKEND_SIGN_UP_REQUEST]: backendSignUpRequest,
  [Types.BACKEND_SIGN_IN_REQUEST]: backendSignInRequest,
  [Types.BACKEND_TRANSACTIONS_REQUEST]: backendTransactionsRequest,
  [Types.BACKEND_MAKE_TRANSFER_REQUEST]: backendMakeTransferRequest,
});
