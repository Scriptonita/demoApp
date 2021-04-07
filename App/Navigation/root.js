/* eslint-disable react/display-name */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AccountScreen, ChangeScreen, SignInScreen, SignUpScreen, TransfersScreen } from '../Screens';
import { routes, screens } from '../Utils/constants';

const session = 'session';
const features = 'features';
const signUpScreenTitle = 'Registro de usuario';

enableScreens();

const SCREENS = {
  SignIn : {
    title: screens.signIn,
    component: (props) => <SignInScreen {...props} />,
    type: session
  },
  SignUp: {
    title: signUpScreenTitle,
    component: (props) => <SignUpScreen {...props} />,
    type: session
  },
  Account: {
    title: screens.account,
    component: (props) => <AccountScreen {...props} />,
    type: features
  },
  Change: {
    title: screens.change,
    component: (props) => <ChangeScreen {...props} />,
    type: features
  },
  Transfer: {
    title: screens.transfer,
    component: (props) => <TransfersScreen {...props} />,
    type: features
  },
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === routes.account) {
            iconName = 'person-outline';
          } else if (route.name === routes.change) {
            iconName = 'briefcase-outline';
          } else if (route.name === routes.transfer) {
            iconName = 'send-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
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

export default RootNavigator