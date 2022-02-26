import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import signin from '../ekranlar/signin';
import signup from '../ekranlar/signup';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="signin"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="signin" component={signin} />
        <Stack.Screen name="signup" component={signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;