import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { logoutCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure(err.response.data.message));
  }
};

export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure(err.response.data.message));
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(logout());
  dispatch(logoutCart());
  try {
    const res = await publicRequest.post("/auth/logout");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const emptyCart = async (dispatch) => {
  dispatch(logoutCart());
};
