import {
  LOAD_USERS,
  SET_USER_COUNT,
  DELETE_USER,
  UPDATE_USER,
  LOAD_SEARCH_USERS,
  CLEAR_SEARCH_USERS,
} from "../actions/types";

const initialState = {
  userList: [],
  searchList: [],
  userCount: 0,
  rowsPerPage: 10,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        userList: [...state.userList, ...action.payload],
      };
    case SET_USER_COUNT:
      return {
        ...state,
        userCount: action.payload,
      };
    case LOAD_SEARCH_USERS:
      return {
        ...state,
        searchList: [...action.payload],
      };
    case CLEAR_SEARCH_USERS:
      return {
        ...state,
        searchList: [],
      };
    case UPDATE_USER:
      return {
        ...state,
        userList: state.userList.map((user) =>
          action.payload.id === user.id ? { ...action.payload } : { ...user }
        ),
        searchList: state.searchList.map((user) =>
          action.payload.id === user.id ? { ...action.payload } : { ...user }
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter(
          (user) => user.email !== action.payload
        ),
        searchList: state.searchList.filter(
          (user) => user.email !== action.payload
        ),
      };
    default:
      return state;
  }
}
