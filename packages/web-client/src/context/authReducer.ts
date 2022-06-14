import { AuthenticatedUser } from '../types';

export interface AuthState {
  user: AuthenticatedUser | null;
  // this function will be called when a user registers or logs in
  authenticateUser: (userData: any) => void;
  // this function will be called when a user logs out
  clearUser: () => void;
}

export enum AuthActionType {
  LOGIN,
  LOGOUT,
}

type AuthAction =
  | { type: AuthActionType.LOGIN; payload: { user: AuthenticatedUser } }
  | { type: AuthActionType.LOGOUT; payload: {} };

export const initialAuthState: AuthState = {
  user: null,
  authenticateUser: (userData: any) => {},
  clearUser: () => {},
};

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
