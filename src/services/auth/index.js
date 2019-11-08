import { apiBase } from "../config";

/**
 * Signs a user in. Returns a JWT.
 * */
export const loginAuth = ({ login, password }) => {
  return fetch(`${apiBase}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: login,
      password: password
    })
  }).then(result => {
    return result.json();
  });
};

/**
 * Ensures a JWT is valid.
 * */
export const authenticate = () => {
  return fetch(`${apiBase}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
