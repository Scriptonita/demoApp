import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import SignInScreen from '../App/Screens/SignInScreen';
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

describe('SignIn Screen', () => {
  it('renders correctly', async () => {
    const { findByText } = renderWithRedux(<SignInScreen />);

    const welcome = await findByText('Bienvenido, por favor inicie sesión');
    expect(welcome).toBeTruthy();
    const usernameLabel = await findByText('Nombre de usuario');
    expect(usernameLabel).toBeTruthy();
    const passwordLabel = await findByText('Contraseña');
    expect(passwordLabel).toBeTruthy();
  });

  it('have username input', async () => {
    const { findByTestId } = renderWithRedux(<SignInScreen />);

    const usernameInput = await findByTestId('signInUsernameInput');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.props['placeholder']).toBe('Su nombre');
  });

  it('have password input', async () => {
    const { findByTestId } = renderWithRedux(<SignInScreen />);

    const passwordInput = await findByTestId('signInPasswordInput');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.props['placeholder']).toBe('Su contraseña');
  });

  it('have a SignUp button', async () => {
    const navigation = { navigate: jest.fn() }
    const { findByTestId } = renderWithRedux(<SignInScreen navigation={navigation} />);
      
    const signUpButton = await findByTestId('signInGoToSignUpButton');
    expect(signUpButton).toBeTruthy();
    fireEvent.press(signUpButton);
    expect(navigation.navigate).toHaveBeenCalledTimes(1)
  })

  it('have a SignIn button that is initialized as disabled', async () => {
    const signIn = jest.fn();

    const { findByTestId } = renderWithRedux(<SignInScreen signIn={signIn} />);
    // const navigation = { navigate: jest.fn() }

    const signInButton = await findByTestId('signInSignInButton');
    expect(signInButton).toHaveStyle({'backgroundColor': '#b5b5b5'})

    fireEvent.press(signInButton);
    expect(signIn).toHaveBeenCalledTimes(0);

    const usernameInput = await findByTestId('signInUsernameInput');
    fireEvent.changeText(usernameInput, 'Test1');

    const passwordInput = await findByTestId('signInPasswordInput');
    fireEvent.changeText(passwordInput, 'test1');

    expect(signInButton).toHaveStyle({'backgroundColor': '#007aff'})
  })
})
