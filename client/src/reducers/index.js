import { combineReducers } from 'redux';
import drawReducer from './drawReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  draw: drawReducer,
  menu: menuReducer,
});
