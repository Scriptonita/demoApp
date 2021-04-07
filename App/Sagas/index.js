import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Types ------------- */

import { DepositsTypes } from '../Redux/DepositsRedux';
import { UserTypes } from '../Redux/UserRedux';
import { TransactionsTypes } from '../Redux/TransactionsRedux';

/* ------------- Sagas ------------- */

import { logout, signIn, signUp } from './UserSagas';
import { getTransactions, makeTransaction } from './TransactionsSagas';
import { getDeposits, makeDeposit } from './DepositsSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // LOGOUT
    takeLatest(UserTypes.LOGOUT_REQUEST, logout),
    // SIGN IN
    takeLatest(UserTypes.SIGN_IN_REQUEST, signIn),

    // SIGN UP
    takeLatest(UserTypes.SIGN_UP_REQUEST, signUp),

    // TRANSACTIONS
    takeLatest(TransactionsTypes.GET_TRANSACTIONS_REQUEST, getTransactions),
    takeLatest(TransactionsTypes.MAKE_TRANSACTION_REQUEST, makeTransaction),

    // DEPOSITS
    takeLatest(DepositsTypes.GET_DEPOSITS_REQUEST, getDeposits),
    takeLatest(DepositsTypes.MAKE_DEPOSIT_REQUEST, makeDeposit),
  ]);
}
