import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,
  DASHBOARD_GET_SECRET
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: "",
  errorMessage: "",
  secret: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: false,
        errorMessage: ""
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case DASHBOARD_GET_SECRET:
      return {
        ...state,
        secret: action.payload
      };
    default:
      return state;
  }
};
