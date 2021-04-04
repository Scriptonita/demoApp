import { put, select } from 'redux-saga/effects';
import BackendActions, { BackendSelectors } from '../Redux/BackendRedux';
import TransactionsActions from '../Redux/TransactionsRedux';
import UserActions from '../Redux/UserRedux';
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

export function* makeTransaction(action) {
  const { userId, toUsername, quantity } = action;

  yield put(BackendActions.backendMakeTransferRequest(userId, toUsername, quantity));

  try {
    const { data, message, status } = yield select(BackendSelectors.getResponse);

    if (status === statusType.success) {
      yield put(TransactionsActions.makeTransactionSuccess(message));
      yield put(UserActions.updateUserData(data));
    } else {
      yield put(TransactionsActions.makeTransactionFailure(message))
    }
  } catch (error) {
    yield put(TransactionsActions.makeTransactionFailure(error))
  }
}