import { combineReducers } from 'redux';
import drawReducer from './drawReducer';

export default combineReducers({
  draw: drawReducer,
});
