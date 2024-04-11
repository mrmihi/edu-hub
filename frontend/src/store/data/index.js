import { combineReducers } from 'redux';

export default combineReducers({
  user: (await import('./user')).default,
});
