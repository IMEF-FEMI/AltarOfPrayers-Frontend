import { client } from "../../graphql/graphqlClient";
import { setLoading, dispatchSnackbar } from "./editionActions";
import {
  users,
  getUsersCount,
  makeAdmin,
  removeAdmin,
  deleteUser,
} from "../../graphql/query_mutation";
import {
  LOAD_USERS,
  SET_USER_COUNT,
  LOAD_SEARCH_USERS,
  DELETE_USER,
  UPDATE_USER,
  CLEAR_SEARCH_USERS,
} from "./types";

export const loadUsers = (variabes, context = "main") => async (dispatch) => {
  dispatch(setLoading(true));
  client
    .query({
      query: users,
      variables: variabes,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (context === "main")
        dispatch({
          type: LOAD_USERS,
          payload: response.data.users,
        });
      if (context === "search") {
        dispatch({
          type: LOAD_SEARCH_USERS,
          payload: response.data.users,
        });
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));

      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const setUsersCount = () => async (dispatch) => {
  client
    .query({
      query: getUsersCount,
    })
    .then((response) => {
      dispatch({
        type: SET_USER_COUNT,
        payload: response.data.usersCount,
      });
    })
    .catch((e) => {
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const clearUsersSearch = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_USERS,
  });
};

export const updateUser = (user) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const makeUserAdmin = (variables) => async (dispatch) => {
  dispatch(setLoading(true));

  client
    .mutate({
      mutation: makeAdmin,
      variables: variables,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (response.data.makeAdmin.success) {
        dispatch(
          dispatchSnackbar(
            `${response.data.makeAdmin.user.fullname} is now an admin`,
            "success"
          )
        );
        return dispatch({
          type: UPDATE_USER,
          payload: response.data.makeAdmin.user,
        });
      } else {
        dispatch(dispatchSnackbar(`${response.data.makeAdmin.error}`, "error"));
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));

      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const removeUserAdmin = (variables) => async (dispatch) => {
  dispatch(setLoading(true));

  client
    .mutate({
      mutation: removeAdmin,
      variables: variables,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (response.data.removeAdmin.success) {
        dispatch(
          dispatchSnackbar(
            `${response.data.removeAdmin.user.fullname} is no longer an admin`,
            "success"
          )
        );
        return dispatch({
          type: UPDATE_USER,
          payload: response.data.removeAdmin.user,
        });
      } else {
        dispatch(
          dispatchSnackbar(`${response.data.removeAdmin.error}`, "error")
        );
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));

      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const removeUser = (variables) => async (dispatch) => {
  dispatch(setLoading(true));

  client
    .mutate({
      mutation: deleteUser,
      variables: variables,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (response.data.deleteUser.success) {
        dispatch(dispatchSnackbar(`User Deleted`, "success"));
        dispatch({
          type: DELETE_USER,
          payload: variables.email,
        });
      } else {
        dispatch(
          dispatchSnackbar(`${response.data.deleteUser.error}`, "error")
        );
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));

      dispatch(dispatchSnackbar(e.message, "error"));
    });
};
