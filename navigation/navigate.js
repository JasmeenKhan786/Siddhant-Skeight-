import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 
import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard'
import Profile from '../screens/Profile'
import SignUp from '../screens/SignUp' 
import LoadingScreen from '../screens/LoadingScreen'
import MentorList from '../screens/MentorList'
import MentorDetails from '../screens/MentorDetails'
import MyAssignments from '../screens/MyAssignments'
import MyRequests from '../screens/MyRequests'
import Reset from '../screens/Reset'
import SettingsScreen from '../screens/Settings'

const Stack1 = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="Dashboard" component={Dashboard} />
      <Stack1.Screen name="MentorList" component={MentorList} />
      <Stack1.Screen name="MentorDetails" component={MentorDetails} />
    </Stack1.Navigator>
  );
};



const Stack3 = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack3.Navigator screenOptions={{ headerShown: false }}>
      <Stack3.Screen name="Profile" component={Profile} />
    <Stack3.Screen name="SettingsScreen" component={SettingsScreen} />

    </Stack3.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabContent = () => {
  return (
    <Tab.Navigator
    initialRouteName="Dashboard" 
  activeColor="#f0edf6"
  inactiveColor="#3e2465" 
  labeled={true}
  barStyle={{ backgroundColor: '#344CB7' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
         return <Image style={{width:20,height:20}}source={require('../assets/home.png')} />;
          } else if (route.name === 'MyRequests') {
       return <Image style={{width:20,height:20}}source={require('../assets/connect.png')} />;
          } else if (route.name === 'Profile') {
        return <Image style={{width:20,height:20}}source={require('../assets/man-user.png')} />;
          } else if (route.name === 'MyAssignments') {
          return <Image style={{width:20,height:20}}source={require('../assets/approve.png')} />;
          }
 
           
        }, 
       
      })}> 
      <Tab.Screen
        name="Dashboard"
        component={HomeStack} 
      />  
      <Tab.Screen
        name="MyRequests"  
        component={MyRequests}
      /> 
      <Tab.Screen
        name="MyAssignments"
        component={MyAssignments}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Reset"
        component={Reset}
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="Dashboard"
        component={TabContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
