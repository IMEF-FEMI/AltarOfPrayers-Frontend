import { SET_ERROR, CLEAR_ERROR } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return "";
    default:
      return state;
  }
}
