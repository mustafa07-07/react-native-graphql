/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ApolloProvider} from '@apollo/react-hooks';
import { ApolloClient,HttpLink, InMemoryCache} from 'apollo-boost';
import { extendTheme, NativeBaseProvider ,LinearGradient} from 'native-base';
import { AsyncStorage } from 'react-native';
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};


  const theme = extendTheme({
    colors:{
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    }
  })

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};


const client = new ApolloClient({
    link: new HttpLink({
      uri: 'https://nodeql.herokuapp.com/',
    }),
    cache: new InMemoryCache(),
    fetchOptions: {
      credentials: 'include',
    },
    request: operation => {
      operation.setContext({
        headers: {
          authorization: AsyncStorage.getItem('token') || 'null',
        },
      });
    },
  });
    
  function Appl() {
    return (
      <ApolloProvider client={client}>
        <NativeBaseProvider config={config} theme={theme}>
        <App />
        </NativeBaseProvider>
       
      </ApolloProvider>
    );
  }
  AppRegistry.registerComponent(appName, () => Appl);
   