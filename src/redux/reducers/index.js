import { combineReducers } from "redux";
import authReducer from "./authReducer";
import editionsReducer from "./editionsReducer";
import usersReducer from "./usersReducer";
import loadingReducer from "./loadingReducer";
import notificationReducer from "./notificationReducer";
import notificationsPageReducer from "./notificationsPageReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  edition: editionsReducer,
  loading: loadingReducer,
  notifications: notificationsPageReducer,
  notification: notificationReducer,
  error: errorReducer,
});
