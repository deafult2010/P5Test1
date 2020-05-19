import axios from 'axios';
import {
  GET_DRAWS,
  ADD_DRAW,
  DELETE_DRAW,
  UPDATE_DRAW,
  DRAWS_LOADING,
  OPEN_PIC,
  TOGGLE_DRAW_MODAL,
} from './types';

export const getDraws = () => (dispatch) => {
  dispatch(setDrawsLoading());
  axios.get('/api/draw').then((res) =>
    dispatch({
      type: GET_DRAWS,
      payload: res.data,
    })
  );
};

export const addDraw = (drawing) => (dispatch) => {
  axios.post('/api/draw', drawing).then((res) =>
    dispatch({
      type: ADD_DRAW,
      payload: res.data,
    })
  );
};

export const updateDraw = (draw) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(draw);

  axios.put(`/api/draw/${draw.id}`, draw, config).then((res) =>
    dispatch({
      type: UPDATE_DRAW,
      payload: res.data,
    })
  );
};

export const deleteDraw = (id) => (dispatch) => {
  axios.delete(`/api/draw/${id}`).then((res) =>
    dispatch({
      type: DELETE_DRAW,
      payload: res.data.id,
    })
  );
};

export const openPic = (id) => (dispatch) => {
  console.log('openPic');
  console.log(id);
  axios.get(`/api/draw/${id}`).then((res) =>
    dispatch({
      type: OPEN_PIC,
      payload: res.data,
    })
  );
};

export const setDrawsLoading = () => {
  return {
    type: DRAWS_LOADING,
  };
};

export const toggleDrawModal = () => {
  return {
    type: TOGGLE_DRAW_MODAL,
  };
};
