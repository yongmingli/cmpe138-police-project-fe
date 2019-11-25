import { apiBase } from "../config";

export const getDashboardCounts = async () => {
  return fetch(`${apiBase}/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
