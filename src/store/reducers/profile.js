import { VERIFY_OSU, VERIFY_OSU_ERROR, SET_PROFILE } from "../actions/types";

const initialState = {
  osuUsername: "",
  errorMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OSU:
      return {
        ...state,
        osuUsername: action.payload,
        errorMessage: ""
      };
    case VERIFY_OSU_ERROR:
      return {
        ...state,
        osuUsername: "",
        errorMessage: "Wrong verification code!"
      };
    case SET_PROFILE:
      return {
        ...state,
        osuUsername: action.payload
      };
    default:
      return state;
  }
};
