import { put, select } from 'redux-saga/effects';
import BackendActions, { BackendSelectors } from '../Redux/BackendRedux';
import UserActions from '../Redux/UserRedux';
import DepositsActions from '../Redux/DepositsRedux';
import TransactionsActions from '../Redux/TransactionsRedux';
import { status as statusType } from '../Utils/constants';

export function* signUp(action) {
  const {username, password} = action;

  yield put(BackendActions.backendSignUpRequest(username, password));

  try {
    const {status , message} = yield select(BackendSelectors.getResponse);

    if (status === statusType.success) {
      yield put(UserActions.signUpSuccess(message))
    } else {
      yield put(UserActions.signUpFailure(message))
    }
  } catch (error) {
    yield put(UserActions.signUpFailure(error))
  }
}

export function* signIn(action) {
  const {username, password} = action;

  yield put(BackendActions.backendSignInRequest(username, password));

  try {
    const {status , message, data} = yield select(BackendSelectors.getResponse);

    if (status === statusType.success) {
      yield put(UserActions.signInSuccess(data, message))
    } else {
      yield put(UserActions.signInFailure(message))
    }
  } catch (error) {
    yield put(UserActions.signInFailure(error))
  }
}

// eslint-disable-next-line no-unused-vars
export function* logout(action) {
  try {
    yield put(DepositsActions.clearStore());
    yield put(TransactionsActions.clearStore());
    yield put(UserActions.logoutSuccess());
  } catch (error) {
    put(UserActions.logoutFailure());
  }
}

