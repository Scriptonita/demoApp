import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens, Screen } from 'react-native-screens';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const session = 'session';
const features = 'features';
const SignIn = 'SignIn';
const SignUp = 'SignUp';
const Account = 'Account'
const Wallet = 'Wallet';
const Transfer = 'Transfer';
const AppTabNavigator = 'AppTabNavigator'

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
        {title === SignIn && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(AppTabNavigator)}
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
    title: SignIn,
    component: (props) =>ExampleScreen({...props, title: SignIn, goTo: SignUp}),
    type: session
  },
  SignUp: {
    title: SignUp,
    component: (props) => ExampleScreen({...props, title: SignUp, goTo: SignIn}),
    type: session
  },
  Account: {
    title: Account,
    component: (props) => ExampleScreen({...props, title: Account, goTo: Wallet}),
    type: features
  },
  Wallet: {
    title: Wallet,
    component: (props) => ExampleScreen({...props, title: Wallet, goTo: Transfer}),
    type: features
  },
  Transfer: {
    title: Transfer,
    component: (props) => ExampleScreen({...props, title: Transfer, goTo: SignIn}),
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
                headerShown: false,
              }}
            />
          ))
        }
        <Stack.Screen
          name={AppTabNavigator}
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