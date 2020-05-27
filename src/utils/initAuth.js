import { store } from "../redux/store";
import { SET_CURRENT_USER } from "../redux";

export const initAuth = async() => {
  if (localStorage.user) {
    const user = JSON.parse(localStorage.user);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  }
};

