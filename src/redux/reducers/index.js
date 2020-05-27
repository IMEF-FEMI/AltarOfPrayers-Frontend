import { combineReducers } from "redux";
import authReducer from "./authReducer";
import editionsReducer from "./editionsReducer";
import usersReducer from "./usersReducer";
import loadingReducer from "./loadingReducer";
import notificationReducer from "./notificationReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  edition: editionsReducer,
  loading: loadingReducer,
  notification: notificationReducer,
  error: errorReducer,
});
