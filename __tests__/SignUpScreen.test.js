import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import SignUpScreen from '../App/Screens/SignUpScreen';
import { Provider } from 'react-redux';
import store from '../App/Redux'
import { Root } from 'native-base';

const renderWithRedux = (component) => {
    const queries = render(<Root><Provider store={store}>{component}</Provider></Root>)

    return {
        ...queries,
        store,
    }
};

describe('SignUp Screen', () => {
  it('renders correctly', async () => {
    const { findByText } = renderWithRedux(<SignUpScreen />);

    
    const welcome = await findByText('Rellene los siguientes datos de usuario');
    expect(welcome).toBeTruthy();
    const usernameLabel = await findByText('Nombre de usuario');
    expect(usernameLabel).toBeTruthy();
    const passwordLabel = await findByText('Contraseña');
    expect(passwordLabel).toBeTruthy();
    const confirmPasswordLabel = await findByText('Confirme contraseña');
    expect(confirmPasswordLabel).toBeTruthy();
  });

  it('have username input', async () => {
    const { findByTestId } = renderWithRedux(<SignUpScreen />);

    const usernameInput = await findByTestId('signUpUsernameInput');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.props['placeholder']).toBe('Su nombre');
  });

  it('have password input', async () => {
    const { findByTestId } = renderWithRedux(<SignUpScreen />);

    const passwordInput = await findByTestId('signUpPasswordInput');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.props['placeholder']).toBe('Su contraseña');
  });

  it('have confirm password input', async () => {
    const { findByTestId } = renderWithRedux(<SignUpScreen />);

    const passwordInput = await findByTestId('signUpConfirmPasswordInput');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.props['placeholder']).toBe('Vuelva a escribir su contraseña');
  });

  it('have a SignUpn button that is initialized as disabled', async () => {
    const signUp = jest.fn();

    const { findByTestId } = renderWithRedux(<SignUpScreen signUp={signUp} />);

    const signUpButton = await findByTestId('signUpSignUpButton');
    expect(signUpButton).toHaveStyle({'backgroundColor': '#b5b5b5'})

    fireEvent.press(signUpButton);
    expect(signUp).toHaveBeenCalledTimes(0);

    const usernameInput = await findByTestId('signUpUsernameInput');
    fireEvent.changeText(usernameInput, 'Test1');

    const passwordInput = await findByTestId('signUpPasswordInput');
    fireEvent.changeText(passwordInput, 'test1');

    const confirmasswordInput = await findByTestId('signUpConfirmPasswordInput');
    fireEvent.changeText(confirmasswordInput, 'test1');

    expect(signUpButton).toHaveStyle({'backgroundColor': '#007aff'})
  })
})
