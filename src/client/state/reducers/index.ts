import { combineReducers } from 'redux';
import { industries, users, names } from './userProperties';

export default combineReducers({
  industries,
  users,
  names,
});
