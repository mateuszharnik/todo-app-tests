import { combineReducers } from 'redux';
import user from './user/reducers';
import auth from './auth/reducers';
import navbar from './navbar/reducers';

const root = combineReducers({
  user,
  auth,
  navbar,
});

export default root;
