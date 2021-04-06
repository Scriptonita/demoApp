import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native'
import { AccountData } from '../App/Components/AccountData';

describe('account data', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<AccountData username={'Javi'} balance={11} />);
  
    expect(getByText(/¡Bienvenido Javi!/)).toBeTruthy();
    expect(getByText(/Tu saldo actual es de: 11/)).toBeTruthy();
  });
})
