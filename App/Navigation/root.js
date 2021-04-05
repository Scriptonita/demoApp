import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens, Screen } from 'react-native-screens';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AccountScreen, ChangeScreen, SignInScreen, SignUpScreen, TransfersScreen } from '../Screens';
import { screens } from '../Utils/constants';

const session = 'session';
const features = 'features';
const signUpScreenTitle = 'Registro de usuario';

enableScreens();

const SCREENS = {
  SignIn : {
    title: screens.signIn,
    // eslint-disable-next-line react/display-name
    component: (props) => <SignInScreen {...props} />,
    type: session
  },
  SignUp: {
    title: signUpScreenTitle,
    // eslint-disable-next-line react/display-name
    component: (props) => <SignUpScreen {...props} />,
    type: session
  },
  Account: {
    title: screens.account,
    // eslint-disable-next-line react/display-name
    component: (props) => <AccountScreen {...props} />,
    type: features
  },
  Change: {
    title: screens.change,
    // eslint-disable-next-line react/display-name
    component: (props) => <ChangeScreen {...props} />,
    type: features
  },
  Transfer: {
    title: screens.transfer,
    // eslint-disable-next-line react/display-name
    component: (props) => <TransfersScreen {...props} />,
    type: features
  },
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        {
          Object.keys(SCREENS)
          .filter((name) => SCREENS[name].type === features)
          .map((name) => (
            <Tab.Screen
              key={name}
              name={name}
              getComponent={() => SCREENS[name].component}
              options={() => ({
                headerShown: false,
                title: SCREENS[name].title
              })}
            />
          ))
        }
  </Tab.Navigator>
  )
}

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          Object.keys(SCREENS)
          .filter((name) => SCREENS[name].type === session)
          .map((name) => (
            <Stack.Screen
              key={name}
              name={name}
              getComponent={() => SCREENS[name].component}
              options={{
                headerShown: name === screens.signUp,
                headerBackTitle: 'Volver',
                headerTitle: SCREENS[name].title
              }}
            />
          ))
        }
        <Stack.Screen
          name={screens.appTabNavigator}
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RootNavigator