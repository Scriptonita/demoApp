import { put, select } from 'redux-saga/effects';
import BackendActions, { BackendSelectors } from '../Redux/BackendRedux';
import TransactionsActions from '../Redux/TransactionsRedux';
import { status as statusType } from '../Utils/constants';

export function* getTransactions(action) {
  const { userId } = action;

  yield put(BackendActions.backendTransactionsRequest(userId));

  try {
    const { data, message, status } = yield select(BackendSelectors.getResponse);

    if (status === statusType.success) {
      yield put(TransactionsActions.getTransactionsSuccess(data))
    } else {
      yield put(TransactionsActions.getTransactionsFailure(message))
    }
  } catch (error) {
    yield put(TransactionsActions.getTransactionsFailure(error))
  }
}