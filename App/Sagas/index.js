import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {UserTypes} from '../Redux/UserRedux';

/* ------------- Sagas ------------- */

import {signIn, signUp} from './UserSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // SIGN IN
    takeLatest(UserTypes.SIGN_IN_REQUEST, signIn),

    // SIGN UP
    takeLatest(UserTypes.SIGN_UP_REQUEST, signUp),
  ]);
}
