import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/UserRedux';
import { TransactionsTypes } from '../Redux/TransactionsRedux';

/* ------------- Sagas ------------- */

import { signIn, signUp } from './UserSagas';
import { getTransactions } from './TransactionsSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // SIGN IN
    takeLatest(UserTypes.SIGN_IN_REQUEST, signIn),

    // SIGN UP
    takeLatest(UserTypes.SIGN_UP_REQUEST, signUp),

    // TRANSACTIONS
    takeLatest(TransactionsTypes.GET_TRANSACTIONS_REQUEST, getTransactions),
  ]);
}
