import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import profileReducer from "./profile";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer
});
