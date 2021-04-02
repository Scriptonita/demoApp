import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {UserTypes} from '../Redux/UserRedux';

/* ------------- Sagas ------------- */

import {signUp} from './UserSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // SignUp
    takeLatest(UserTypes.SIGN_UP_REQUEST, signUp),
  ]);
}
