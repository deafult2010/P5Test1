import { TOGGLE_MENU_MODAL } from '../actions/types';

const initialState = {
  menuModalOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU_MODAL:
      return {
        ...state,
        menuModalOpen: !state.menuModalOpen,
      };
    default:
      return state;
  }
}
