import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/context/auth';
import HomeStack from './src/route/home';
import AuthStack from './src/route/auth';
import {useAuth} from './src/hooks/useAuth';
import {UserContext} from './src/context/userContext';
import {ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function () {
  const {auth, state} = useAuth();
  // const isDarkMode = useDarkMode();

  function SplashScreen() {
    return <ActivityIndicator size={'large'} />;
  }
  function renderScreens() {
    if (state.loading) {
      return <SplashScreen />;
    }
    return state.user ? (
      <UserContext.Provider value={state.user}>
        <HomeStack />
      </UserContext.Provider>
    ) : (
      <UserContext.Provider value={state.user}>
      <AuthStack />
      </UserContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <>       
        {renderScreens()}
      </>
    </AuthContext.Provider>
  );
}
