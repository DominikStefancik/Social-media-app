import React, { createContext, useReducer } from 'react';
import { AuthenticatedUser } from '../types';
import { AuthActionType, authReducer, AuthState, initialAuthState } from './authReducer';

export const AuthContext = createContext<AuthState>(initialAuthState);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // "dispatch" function returned from the "useReducer" hook will dispatch any action
  // and then "authReducer" will listen to it and update the AuthState
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (userData: AuthenticatedUser) => {
    dispatch({
      type: AuthActionType.LOGIN,
      payload: { user: userData },
    });
  };

  const logout = () => {
    dispatch({
      type: AuthActionType.LOGOUT,
      payload: {},
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, authenticateUser: login, clearUser: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
