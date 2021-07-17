import { combineReducers } from 'redux';
import user from '../user/reducers';

const root = combineReducers({
  user,
});

export default root;
