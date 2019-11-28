import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import profileReducer from "./profile";
import leaderboardReducer from "./leaderboard";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer,
  leaderboard: leaderboardReducer
});
