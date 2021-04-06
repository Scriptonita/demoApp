import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native'
import { TransactionsHistory } from '../App/Components/TransactionsHistory';
import { userList, transactions } from '../App/Utils/mockData';

const userId = userList[0].id;

const transactionsMock = transactions.filter(transaction => transaction.from === userId || transaction.to === userId);

describe('transactions history', () => {
  it('renders correctly', async () => {
    const { getByText, findAllByText  } = render(<TransactionsHistory userId={userId} transactions={transactionsMock} getTransactions={() => jest.fn()} />);
  
    expect(getByText(/Estos han sido tus movimientos/)).toBeTruthy();

    const transactions = await findAllByText(/Cantidad/);
    expect(transactions).toHaveLength(transactionsMock.length);
  });
})
