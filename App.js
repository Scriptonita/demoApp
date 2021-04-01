import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { RootNavigator } from './App/Navigation'
import store from './App/Redux'

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />  
    </Provider>
    );
  }
  
 export default App;
