// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { rootEpic, rootReducer } from '../ducks';

const history = createBrowserHistory();
const epic = createEpicMiddleware(rootEpic);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(epic, router);

function configureStore(initialState?: {}) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
