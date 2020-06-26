import { client } from "../../graphql/graphqlClient";
import { setLoading, dispatchSnackbar } from "./editionActions";
import {
  LOAD_NOTIFICATIONS,
  SET_NOTIFICATIONS_COUNT,
  UPDATE_NOTIFICATION,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "./types";
import {
  adminNotifications,
  getNotificationsCount,
  createNotification,
  deleteNotification,
} from "../../graphql/query_mutation";

export const loadNotifications = (variables) => async (dispatch) => {
  dispatch(setLoading(true));
  client
    .query({
      query: adminNotifications,
      variables: variables,
    })
    .then((response) => {
      dispatch(setLoading(false));
      dispatch({
        type: LOAD_NOTIFICATIONS,
        payload: response.data.adminNotifications,
      });
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const setNotificationsCount = () => async (dispatch) => {
  client
    .query({
      query: getNotificationsCount,
    })
    .then((response) => {
      dispatch({
        type: SET_NOTIFICATIONS_COUNT,
        payload: response.data.notificationsCount,
      });
    })
    .catch((e) => {
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};
export const addNotification = (variables) => async (dispatch) => {
  client
    .mutate({
      mutation: createNotification,
      variables:variables,
    })
    .then((response) => {
      if (response.data.createNotification.success)
        dispatch({
          type: ADD_NOTIFICATION,
          payload: response.data.createNotification.notification,
        });
    })
    .catch((e) => {
      console.log(e)
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};
export const removeNotification = (variables) => async (dispatch) => {
  client
    .mutate({
      mutation: deleteNotification,
      variables,
    })
    .then((response) => {
      if (response.data.deleteNotification.success) {
        dispatch(dispatchSnackbar(`Notification Removed`, "success"));
        dispatch({
          type: DELETE_NOTIFICATION,
          payload: variables.id,
        });
      } else
        dispatch(
          dispatchSnackbar(`${response.data.deleteNotification.error}`, "error")
        );
    });
};
export const updateNotification = (notification) => async (dispatch) => {
  dispatch({
    type: UPDATE_NOTIFICATION,
    payload: notification,
  });
};
