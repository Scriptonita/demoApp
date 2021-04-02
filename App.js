import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { RootNavigator } from './App/Navigation'
import store from './App/Redux'

const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <RootNavigator />  
      </Root>
    </Provider>
    );
  }
  
 export default App;
