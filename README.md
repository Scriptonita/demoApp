#  DemoApp

Project created with Expo-cli

## Install

```
    yarn install
```

## iOS

```
    cd ios
    pod install
    cd ..
    yarn ios
```

## Android

```
    yarn android
```

## Tests

```
    yarn test
```

## Test users

There are 3 predefined users that you can use to test the app.

* username: Test1 // password: test1
* username: Test2 // password: test2
* username: Test3 // password: test3

Known error:
(Android and iOS)
* There is an error in Tabs styleTab prop.

(Android)
* On android simulator when user get success on login, the screen looks like frozen and only continue if user click on screen, then app go to Account screen. This error is not happening on real devices.
  