import {
  LOAD_NOTIFICATIONS,
  SET_NOTIFICATIONS_COUNT,
  UPDATE_NOTIFICATION,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  notificationList: [],
  notificationsCount: 0,
  rowsPerPage: 10,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        notificationList: [...state.notificationList, ...action.payload],
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
    case DELETE_USER:
      return {
        ...state,
        notificationList: state.notificationList.filter(
          (notification) => notification.email !== action.payload
        ),
      };
    default:
      return state;
  }
}
