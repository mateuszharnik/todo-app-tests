import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];

const composeWrapper = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  reducers,
  composeWrapper(applyMiddleware(...middlewares)),
);

export default store;
