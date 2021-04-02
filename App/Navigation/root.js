import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens, Screen } from 'react-native-screens';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SingUpScreen from '../Screens/SignUpScreen';
import { screens } from '../Utils/constants';

const session = 'session';
const features = 'features';
const signUpScreenTitle = 'Registro de usuario';

enableScreens();

const ExampleScreen = ({title, goTo, navigation}) => {
  return (
    <Screen style={styles.container}>
      <SafeAreaView>
        <View><Text>{title}</Text></View>
        <TouchableOpacity
          onPress={() => navigation.navigate(goTo)}
        >
          <Text>ir a {goTo}</Text>
        </TouchableOpacity>
        {title === screens.signIn && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.appTabNavigator)}
            >
              <Text>Go to App</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Screen>
  );
}

const SCREENS = {
  SignIn : {
    title: screens.signIn,
    component: (props) => ExampleScreen({...props, title: screens.signIn, goTo: screens.signUp}),
    type: session
  },
  SignUp: {
    title: signUpScreenTitle,
    // eslint-disable-next-line react/display-name
    component: (props) => <SingUpScreen {...props} />,
    type: session
  },
  Account: {
    title: screens.account,
    component: (props) => ExampleScreen({...props, title: screens.account, goTo: screens.wallet}),
    type: features
  },
  Wallet: {
    title: screens.wallet,
    component: (props) => ExampleScreen({...props, title: screens.wallet, goTo: screens.transfer}),
    type: features
  },
  Transfer: {
    title: screens.transfer,
    component: (props) => ExampleScreen({...props, title: screens.transfer, goTo: screens.signIn}),
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
                headerShown: false
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