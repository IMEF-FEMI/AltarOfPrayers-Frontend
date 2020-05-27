import {
  LOAD_EDITIONS,
  SET_COUNT,
  FETCHING,
  INITIAL_FETCH,
  ADD_EDITION,
  UPDATE_EDITION,
  DELETE_EDITION,
  LOAD_SEARCH_EDITIONS,
  CLEAR_SEARCH
} from "../actions/types";

const initialState = {
  initialFetch: true,
  editions: [],
  searchEditions: [],
  fetching: false,
  count: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_EDITIONS:
      return {
        ...state,
        // if state.editions[0] exists, check if its new or same old list
        editions: [...action.payload, ...state.editions],
      };
    case LOAD_SEARCH_EDITIONS:
      return {
        ...state,
        searchEditions: [...action.payload, ...state.searchEditions],
      };
    case CLEAR_SEARCH:
      return{
        ...state,
        searchEditions: []
      }
    case ADD_EDITION:
      return {
        ...state,
        editions: [action.payload, ...state.editions],
        count: state.count + 1,
      };
    case UPDATE_EDITION:
      return {
        ...state,
        editions: state.editions.map((edition) =>
          action.payload.edition.id === edition.id
            ? { ...action.payload.edition }
            : { ...edition }
        ),
      };
    case DELETE_EDITION:
      return {
        ...state,
        editions: state.editions.filter(
          (edition) => edition.id !== action.payload
        ),
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };

    case INITIAL_FETCH:
      return {
        ...state,
        initialFetch: action.payload,
      };
    case FETCHING:
      return {
        ...state,
        fetching: action.payload,
      };

    default:
      return state;
  }
}
