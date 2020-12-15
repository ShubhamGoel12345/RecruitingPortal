/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//Import React
import React from 'react';

//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens needed
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutesEmployer from './Screen/DrawerNavigationRoutesEmployer';
import DrawerNavigatorRoutesEmployee from './Screen/DrawerNavigationRouteEmployee'
import EmployeeListScreen from './Screen/EmployeeListScreen';
import EmployeeProfileScreen from './Screen/EmployeeProfileScreen';
import ViewProfileScreen from './Screen/ViewProfileScreen';

const App = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
  },
  Auth: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Register',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#eee',
      },
      headerTintColor: 'black',
    },
  },
  DrawerNavigationRoutesEmployer: {
    /* Navigation Drawer as a landing page */
    screen: DrawerNavigationRoutesEmployer,
    navigationOptions: {
      /* Hiding header for Navigation Drawer as we will use our custom header */
      headerShown: false,
    },
  },
  DrawerNavigationRoutesEmployee: {
    screen: DrawerNavigatorRoutesEmployee,
    navigationOptions: {
      headerShown: false
    }
  },
  EmployeeListScreen: {
    screen: EmployeeListScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ViewProfileScreen: {
    screen: ViewProfileScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  EmployeeProfileScreen: {
    screen: EmployeeProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
},
{
  initialRouteName: "SplashScreen"
});

export default createAppContainer(App);