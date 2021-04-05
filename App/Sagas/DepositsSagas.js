import { put, select } from 'redux-saga/effects';
import BackendActions, { BackendSelectors } from '../Redux/BackendRedux';
import DepositsActions from '../Redux/DepositsRedux';
import UserActions from '../Redux/UserRedux';
import { status as statusType } from '../Utils/constants';

export function* getDeposits(action) {
  const { userId } = action;

  yield put(BackendActions.backendDepositsRequest(userId));

  try {
    const { data, message, status } = yield select(BackendSelectors.getResponse);

    if (status === statusType.success) {
      yield put(DepositsActions.getDepositsSuccess(data))
    } else {
      yield put(DepositsActions.getDepositsFailure(message))
    }
  } catch (error) {
    yield put(DepositsActions.getDepositsFailure(error))
  }
}

export function* makeDeposit(action) {
  const { userId, quantity, depositType } = action;

  yield put(BackendActions.backendMakeDepositRequest(userId, quantity, depositType));

  try {
    const { data, message, status } = yield select(BackendSelectors.getResponse);

    if (status === statusType.success) {
      yield put(DepositsActions.makeDepositSuccess(message));
      yield put(UserActions.updateUserData(data));
    } else {
      yield put(DepositsActions.makeDepositFailure(message))
    }
  } catch (error) {
    yield put(DepositsActions.makeDepositFailure(error))
  }
}