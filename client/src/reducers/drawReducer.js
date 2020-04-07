import {
  GET_DRAWS,
  ADD_DRAW,
  DELETE_DRAW,
  DRAWS_LOADING,
  UPDATE_DRAW,
} from '../actions/types';

const initialState = {
  draws: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DRAWS:
      return {
        ...state,
        draws: action.payload,
        loading: false,
      };
    case DELETE_DRAW:
      return {
        ...state,
        draw: state.draw.filter((item) => item._id !== action.payload),
      };
    case UPDATE_DRAW:
      return {
        ...state,
        draw: state.draw.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case ADD_DRAW:
      return {
        ...state,
        draw: [action.payload, ...state.draw],
      };
    case DRAWS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
