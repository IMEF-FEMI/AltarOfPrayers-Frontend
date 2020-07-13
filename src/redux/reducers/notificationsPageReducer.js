import {
  LOAD_NOTIFICATIONS,
  SET_NOTIFICATIONS_COUNT,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  ADD_NOTIFICATION,
} from "../actions/types";

const initialState = {
  notificationList: [],
  notificationsCount: 0,
  rowsPerPage: 10,
  initialFetch: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      console.log(action.payload);

      return {
        ...state,
        initialFetch: false,
        notificationList: [...state.notificationList, ...action.payload],
      };

    case ADD_NOTIFICATION:
      return {
        ...state,
        notificationList: [action.payload, ...state.notificationList],
      };
    case SET_NOTIFICATIONS_COUNT:
      return {
        ...state,
        notificationsCount: action.payload,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notificationList: state.notificationList.map((notification) =>
          action.payload.id === notification.id
            ? { ...action.payload }
            : { ...notification }
        ),
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notificationList: state.notificationList.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
