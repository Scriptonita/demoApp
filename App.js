import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Root, Spinner } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { RootNavigator } from './App/Navigation'
import store from './App/Redux'

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
    }
    load().then(() => 
      setFontsLoaded(true)
    )
  }, [])
  
  if (!fontsLoaded) {
    return (
      <Root>
        <Spinner />
      </Root>
    );
  }

  return (
    <Provider store={store}>
      <Root>
        <RootNavigator />  
      </Root>
    </Provider>
    );
  }
  
 export default App;
