import { LOGIN } from "./actionTypes";

export const loginRedux = user => ({
  type: LOGIN,
  payload: {
    ...user
  }
});
