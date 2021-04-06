import 'react-native';
import React from 'react';
import { findByText, render } from '@testing-library/react-native'
import App from '../App';

describe('App', () => {
  it('renders correctly', async () => {
    const { findByText } = render(<App />);

    const welcome = await findByText('Bienvenido, por favor inicie sesión');
    expect(welcome).toBeTruthy();
  });
})
