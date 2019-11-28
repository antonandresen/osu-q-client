import axios from "axios";

import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  DASHBOARD_GET_SECRET,
  VERIFY_OSU,
  VERIFY_OSU_ERROR,
  SET_PROFILE,
  GET_LEADERBOARD
} from "./types";

const axiosHeaders = {
  "Content-Type": "application/json"
};

const isDevelopment = false;
let url = "";
if (isDevelopment) url = "http://localhost:5000/api/v1";
else url = "https://osu-q.herokuapp.com/api/v1";

export const oauthGoogle = data => async dispatch => {
  const res = await axios.post(url + "/users/oauth/google", {
    access_token: data
  });
  console.log("axios res:", res);

  dispatch({
    type: AUTH_SIGN_UP,
    payload: res.data.token
  });

  localStorage.setItem("JWT_TOKEN", res.data.token);
  axios.defaults.headers.common["Authorization"] = res.data.token;
};

export const oauthFacebook = data => async dispatch => {
  const res = await axios.post(url + "/users/oauth/facebook", {
    access_token: data
  });
  console.log("axios res:", res);

  dispatch({
    type: AUTH_SIGN_UP,
    payload: res.data.token
  });

  localStorage.setItem("JWT_TOKEN", res.data.token);
  axios.defaults.headers.common["Authorization"] = res.data.token;
};

export const SignUp = data => async dispatch => {
  try {
    const res = await axios.post(url + "/users/signup", data, {
      headers: axiosHeaders
    });
    console.log("axios res:", res);

    dispatch({
      type: AUTH_SIGN_IN,
      payload: res.data.token
    });

    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email is already in use"
    });
    console.error("axios error:", err.response);
  }
};

export const SignIn = data => async dispatch => {
  try {
    const res = await axios.post(url + "/users/signin", data);
    console.log("axios res:", res);

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email and password combination is not valid."
    });
    console.error("axios error:", err.response);
  }
};

export const SignOut = () => dispatch => {
  localStorage.removeItem("JWT_TOKEN");
  axios.defaults.headers.common["Authorization"] = "";

  dispatch({
    type: AUTH_SIGN_OUT,
    payload: "" // reset token to empty string.
  });
};

export const getSecret = () => async dispatch => {
  try {
    console.log("ActionCreator secret");
    const res = await axios.get(url + "/users/secret");
    console.log("res:", res);

    dispatch({
      type: DASHBOARD_GET_SECRET,
      payload: res.data.secret
    });
  } catch (err) {
    console.error(err);
  }
};

//-----------------------------------
// PROFILE ACTIONS
//-----------------------------------
export const VerifyOsuAccount = data => async dispatch => {
  try {
    const res = await axios.post(url + "/osu/verify", data);
    console.log("axios res:", res);

    dispatch({
      type: VERIFY_OSU,
      payload: res.data.osu_userid
    });
  } catch (err) {
    dispatch({
      type: VERIFY_OSU_ERROR,
      payload: "This error message wont matter"
    });
    console.error("axios error:", err.response);
  }
};

export const setProfile = data => async dispatch => {
  try {
    const res = await axios.get(url + "/osu/profile");
    console.log("axios res:", res);

    dispatch({
      type: SET_PROFILE,
      payload: res.data.osu_userid
    });
  } catch (err) {
    console.error("axios error:", err.response);
  }
};

//-----------------------------------
// LEADERBOARD ACTIONS
//-----------------------------------

export const getLeaderboard = data => async dispatch => {
  try {
    const res = await axios.get(url + "/osu/leaderboard");
    console.log("axios res:", res);

    dispatch({
      type: GET_LEADERBOARD,
      payload: res.data
    });
  } catch (err) {
    console.error("axios error:", err.response);
  }
};
