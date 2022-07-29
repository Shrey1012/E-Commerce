import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res)
    dispatch(loginSuccess(res.data));
  } catch (err) {
  	console.log(err)
    dispatch(loginFailure(err.response.data.message));
  }
};

export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    console.log(res)
    dispatch(loginSuccess(res.data));
  } catch (err) {
  	console.log(err)
    dispatch(loginFailure(err.response.data.message));
  }
}