import { LOGIN, AUTHENTICATE } from "../actionTypes";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE: {
      return { ...state, isFetching: true };
    }
    case LOGIN: {
      return {
        ...state,
        user: action.payload,
        isFetching: false
      };
    }
    default:
      return state;
  }
}
