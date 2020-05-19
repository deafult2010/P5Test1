import {
  GET_DRAWS,
  ADD_DRAW,
  DELETE_DRAW,
  DRAWS_LOADING,
  UPDATE_DRAW,
  OPEN_PIC,
  TOGGLE_DRAW_MODAL,
} from '../actions/types';

const initialState = {
  draws: [],
  loading: false,
  pics: [],
  getPics: false,
  drawModalOpen: false,
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
        draws: state.draws.filter((draw) => draw._id !== action.payload),
        getPics: !state.getPics,
      };
    case UPDATE_DRAW:
      return {
        ...state,
        draws: state.draws.map((draw) =>
          draw._id === action.payload._id ? action.payload : draw
        ),
      };
    case ADD_DRAW:
      return {
        ...state,
        draws: [action.payload, ...state.draws],
        getPics: !state.getPics,
      };
    case DRAWS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case OPEN_PIC:
      return {
        ...state,
        pics: action.payload,
      };
    case TOGGLE_DRAW_MODAL:
      return {
        ...state,
        drawModalOpen: !state.drawModalOpen,
      };
    default:
      return state;
  }
}
