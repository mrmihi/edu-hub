import { combineReducers } from 'redux';
import global from './global';
import login from './login';
import register from './register';
import users from './users';
import courses from './courses';
import orders from './orders';
import tickets from './tickets';

export default combineReducers({
  global,
  login,
  register,
  users,
  courses,
  orders,
  tickets,
});
