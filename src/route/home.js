import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../ekranlar/home';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;