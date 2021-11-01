import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

const middlewares = [thunk];

const composeWrapper = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const store = createStore(
  reducer,
  composeWrapper(applyMiddleware(...middlewares)),
);

export default store;
