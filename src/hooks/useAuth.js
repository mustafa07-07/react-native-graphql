import React, {useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {sleep} from '../utils/sleep';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {createAction} from '../utils/createAction';
import {LOGIN} from '../Queries/query';

export function useAuth() {
  const [giris] = useMutation(LOGIN);

  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'SET_ERROR':
          return {
            loading: false,
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
            loading: false,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      /*login: async (email, password) => {
        await axios.post(`${BASE_URL}/users/login`, {
          email,
          password,
        }).then(
          SecureStorage.setItem('user', JSON.stringify(response.data)),
          dispatch(createAction('SET_USER', response.data))
        )
       
      },
      */
      login: async (username, password) => {
        await giris({
          variables: {username, password},
        }).then(res => {
          console.log("res => "+res)
          if (res.data.login.token) {
            AsyncStorage.setItem('user', JSON.stringify(res.data.login.token));
            dispatch(createAction('SET_USER', password));
          }
        });
      },
      logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (email, password) => {
        await sleep(2000);
        await AsyncStorage.setItem('user', JSON.stringify(email));
      },
    }),
    [],
  );
  useEffect(() => {
    sleep(1).then(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);
  return {auth, state};
}
