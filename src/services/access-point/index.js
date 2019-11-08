import { apiBase } from "../config";

/**
 * Creates an AccessPoint
 * */
export const createAccessPoint = ({ login, password }) => {
  return fetch(`${apiBase}/access_point`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: login,
      password: password
    })
  }).then(result => {
    return result.json();
  });
};
