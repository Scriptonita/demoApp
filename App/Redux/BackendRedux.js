import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { status } from '../Utils/constants';
import { deposits, userList, transactions } from '../Utils/mockData';
import { depositTypes } from '../Utils/constants';
import * as R from 'ramda'

/* ------------- Types and Action Creators ------------- */
const unknown = 'desconocido';

const {Types, Creators} = createActions({
  backendSignUpRequest: ['username', 'password'],
  backendSignInRequest: ['username', 'password'],
  backendTransactionsRequest: ['userId'],
  backendMakeTransferRequest: ['userId', 'toUsername', 'quantity'],
  backendMakeDepositRequest: ['userId', 'quantity', 'depositType'],
  backendDepositsRequest: ['userId'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: userList,
  transfers: transactions,
  deposits,
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
   
    const userData = users.find(user => R.toLower(user.username) === R.toLower(username) && user.password === password);

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
    const usersList = users.filter(user => R.toLower(user.username) !== R.toLower(username));
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

/* ------------- MAKE A DEPOSIT REQUEST ------------- */

export const backendMakeDepositRequest = (state, {userId, quantity, depositType}) => {
    const { deposits, users } = state;
    const success = `El ${depositType === depositTypes.deposit ? 'depósito' : 'retiro'} se ha realizado con éxito`;

    const user = users.find(user => user.id === userId);
    const usersList = users.filter(user => user.id !== userId);

    const newDeposit = {
        id: uuidv4(),
        userId,
        quantity,
        type: depositType,
    };

    const balance = depositType === depositTypes.deposit ? 
        parseFloat(user.balance) + parseFloat(quantity)
        :
        parseFloat(user.balance) - parseFloat(quantity);

    const userUpdated = R.mergeRight(user, { balance });

    return state.merge({
        response: {
            status: status.success,
            data: userUpdated,
            message: success,
        },
        users: [...usersList, userUpdated],
        deposits: [...deposits, newDeposit],
    });
}

/* ------------- GET DEPOSIT HISTORY REQUEST ------------- */


export const backendDepositsRequest = (state, {userId}) => {
    const { deposits } = state;

    let userHistory = [];

    deposits.forEach(deposit => {
        if (deposit.userId === userId) {
            userHistory.push(deposit)
        }
    });

    return state.merge({
        response: {
            status: status.success,
            data: userHistory,
            message: null,
        }
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BACKEND_SIGN_UP_REQUEST]: backendSignUpRequest,
  [Types.BACKEND_SIGN_IN_REQUEST]: backendSignInRequest,
  [Types.BACKEND_TRANSACTIONS_REQUEST]: backendTransactionsRequest,
  [Types.BACKEND_MAKE_TRANSFER_REQUEST]: backendMakeTransferRequest,
  [Types.BACKEND_MAKE_DEPOSIT_REQUEST]: backendMakeDepositRequest,
  [Types.BACKEND_DEPOSITS_REQUEST]: backendDepositsRequest,
});
