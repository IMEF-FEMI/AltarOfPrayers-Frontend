import { SET_CURRENT_USER, SET_ERROR, CLEAR_ERROR, LOADING } from "./types";
import { client } from "../../graphql/graphqlClient";
import { loginUser } from "../../graphql/query_mutation";
import { AUTH_TOKEN, USER } from "../../utils/constants";
import { dispatchSnackbar } from "./editionActions";

export const login = (cred) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: LOADING, payload: true });
  client
    .mutate({
      mutation: loginUser,
      variables: cred,
    })
    .then(async (response) => {
      if (response.data.loginUser.success) {
        dispatch({ type: LOADING, payload: false });

        if (response.data.loginUser.user.admin) {
          await storeUserInfo(response);

          dispatch({
            type: SET_CURRENT_USER,
            payload: response.data.loginUser.user,
          });
        } else {
          return dispatch(dispatchSnackbar("Sorry This Page is for Admin Only", "error"))
        }
      } else {
        dispatch({ type: LOADING, payload: false });

        dispatch({
          type: SET_ERROR,
          payload: response.data.loginUser.error,
        });
        dispatch(dispatchSnackbar(response.data.loginUser.error, "error"))

      }
    })
    .catch((e) => {
      dispatch({ type: LOADING, payload: false });

      dispatch({
        type: SET_ERROR,
        payload: e.message,
      });
      dispatch(dispatchSnackbar(e.message, "error"))

     
    });
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: SET_CURRENT_USER,
  });
  window.location.href = "/admin";
};

export const storeUserInfo = async (response) => {
  localStorage.setItem(AUTH_TOKEN, response.data.loginUser.token);
  localStorage.setItem(USER, JSON.stringify(response.data.loginUser.user));
};
