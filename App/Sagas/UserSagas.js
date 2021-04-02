import { put, select } from 'redux-saga/effects';
import BackendActions, { BackendSelectors } from '../Redux/BackendRedux';
import UserActions from '../Redux/UserRedux';
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
