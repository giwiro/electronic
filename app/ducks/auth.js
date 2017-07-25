// @flow
import Rx from 'rxjs';
// Actions
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTHSUCCESS';
const AUTH_ERROR = 'AUTH_ERROR';

type actionType = {
  +type: string,
  +user?: any,
  +error?: any,
  +username?: string,
  +password?: string
};

export type authStateType = {
  +is_auth?: boolean,
  +error?: any,
  +user?: any
};


// Action Creators
export function login(username: string, password: string): actionType {
  return {
    type: AUTH_REQUEST,
    username,
    password
  };
}

export function loginSuccess(user: any): actionType {
  return {
    type: AUTH_SUCCESS,
    user
  };
}

export function loginError(error: any): actionType {
  return {
    type: AUTH_ERROR,
    error
  };
}

export const actions = {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  login,
  loginSuccess,
  loginError
};


// Reducer
export default function reducer(state: authStateType = {}, action: actionType): authStateType {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        is_auth: true
      };
    case AUTH_SUCCESS:
      return {
        user: action.user
      };
    case AUTH_ERROR:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

// EPIC
export function loginEpic(action$: any) {
  return action$.ofType(AUTH_REQUEST)
    .mergeMap(() =>
      Rx.Observable.of({ id: 'asdasd', name: 'giwiro' })
        .map(user => loginSuccess(user))
        .catch(error => Rx.Observable.of(loginError(error)))
    );
}
