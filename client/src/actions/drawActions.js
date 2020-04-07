import axios from 'axios';
import {
  GET_DRAWS,
  ADD_DRAW,
  DELETE_DRAW,
  UPDATE_DRAW,
  DRAWS_LOADING,
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

export const addItem = (item) => (dispatch) => {
  axios.post('/api/items', item).then((res) =>
    dispatch({
      type: ADD_DRAW,
      payload: res.data,
    })
  );
};

export const updateDraw = (item) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(item);

  axios.put(`/api/items/${item.id}`, item, config).then((res) =>
    dispatch({
      type: UPDATE_DRAW,
      payload: res.data,
    })
  );
};

export const deleteDraw = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) =>
    dispatch({
      type: DELETE_DRAW,
      payload: res.data.id,
    })
  );
};

export const setDrawsLoading = () => {
  return {
    type: DRAWS_LOADING,
  };
};
