import React from 'react';
import { useStore } from 'react-redux';
import * as authClient from './auth-client';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const store = useStore();
  const firstName = window.localStorage.first_name;
  const lastName = window.localStorage.last_name;
  const { userID } = window.localStorage;
  store.dispatch({ type: 'SET_USER', payload: { firstName, lastName, userID } });
  const login = (data) => authClient.login(data);
  return (
    <AuthContext.Provider value={{ login }} {...props} />
  );
}
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth };
