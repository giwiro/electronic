import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { loginEpic } from './auth';

export const rootEpic = combineEpics(
  loginEpic
);
export const rootReducer = combineReducers(
  authReducer
);
