import { GET_LEADERBOARD } from "../actions/types";

const initialState = {
  leaderboard: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload.reverse()
      };
    default:
      return state;
  }
};
