/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import EmployerProfileScreen from './EmployerProfileScreen';
import CustomSidebarMenuEmployer from './Components/CustomeSideBarMenuEmployer';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

import EmployeeListScreen from './EmployeeListScreen'
const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: EmployeeListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#eee',
      },
      headerTintColor: 'black',
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: EmployerProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#eee',
      },
      headerTintColor: 'black',
    }),
  },
});

const DrawerNavigationRoutesEmployer = createDrawerNavigator(
  {
    HomeScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    EmployeeProfileScreen: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Profile',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenuEmployer,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);
export default DrawerNavigationRoutesEmployer;