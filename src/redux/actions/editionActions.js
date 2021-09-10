import React from "react";
import Button from "@material-ui/core/Button";
import { client } from "../../graphql/graphqlClient";
import {
  editions,
  getEditionsCount,
  addEdition,
  addPrayer,
} from "../../graphql/query_mutation";
import {
  LOAD_EDITIONS,
  LOADING,
  FETCHING,
  SET_COUNT,
  ADD_EDITION,
  UPDATE_EDITION,
  DELETE_EDITION,
  INITIAL_FETCH,
  LOAD_SEARCH_EDITIONS,
  CLEAR_SEARCH
} from "./types";
import { enqueueSnackbar, closeSnackbar } from "./notificationAction";

export const loadEditions = (cred, context = "main") => async (dispatch) => {
  dispatch(setLoading(true));
  client
    .query({
      query: editions,
      variables: cred,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (context === "main")
        dispatch({
          type: LOAD_EDITIONS,
          payload: response.data.editions,
        });
      if (context === "search") {
        dispatch({
          type: LOAD_SEARCH_EDITIONS,
          payload: response.data.editions,
        });
        dispatch(
          dispatchSnackbar(
            `${response.data.editions.length} ${
              response.data.editions.length === 1 ? "Match" : "Matches"
            } Found`,
            "success"
          )
        );
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));

      dispatch(dispatchSnackbar(e.message, "error"));
    });
  dispatch(setCount());
};

export const clearSearch = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  });
};

export const dispatchSnackbar = (message, variant) => async (dispatch) => {
  dispatch(
    enqueueSnackbar({
      message: message,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: variant,
        action: (key) => (
          <Button
            style={{ color: "#fff" }}
            onClick={() => dispatch(closeSnackbar(key))}
          >
            dismiss
          </Button>
        ),
      },
    })
  );
};
export const setFetching = (fetching) => async (dispatch) => {
  dispatch({ type: FETCHING, payload: fetching });
};

export const setLoading = (value) => async (dispatch) => {
  dispatch({ type: LOADING, payload: value });
};
export const setCount = () => async (dispatch) => {
  client
    .query({
      query: getEditionsCount,
    })
    .then((response) => {
      dispatch({
        type: SET_COUNT,
        payload: response.data.count,
      });
    })
    .catch((e) => {
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const addNewEdition = (variables) => async (dispatch) => {
  dispatch(setLoading(true));
  client
    .mutate({
      mutation: addEdition,
      variables: variables,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (response.data.createEdition.success) {
        dispatch({
          type: ADD_EDITION,
          payload: response.data.createEdition.edition,
        });
        return dispatch(
          dispatchSnackbar("New Edition successfully Added", "success")
        );
      }
      return dispatch(
        dispatchSnackbar(response.data.createEdition.error, "error")
      );
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};

export const addPrayerPoint = (variables) => async (dispatch) => {
  dispatch(setLoading(true));
  client
    .mutate({
      mutation: addPrayer,
      variables: variables,
    })
    .then((response) => {
      dispatch(setLoading(false));
      if (response.data.addPrayer.success) {
        return dispatch(dispatchSnackbar("Success", "success"));
      }
      return dispatch(dispatchSnackbar(response.data.addPrayer.error, "error"));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch(dispatchSnackbar(e.message, "error"));
    });
};
export const updateEdition = (edition) => async (dispatch) => {
  dispatch({
    type: UPDATE_EDITION,
    payload: edition,
  });
};

export const setInitialFetch = (value) => async (dispatch) => {
  dispatch({
    type: INITIAL_FETCH,
    payload: value,
  });
};

export const deleteEdition = (editionId) => async (dispatch) => {
  dispatch({
    type: DELETE_EDITION,
    payload: editionId,
  });
};
