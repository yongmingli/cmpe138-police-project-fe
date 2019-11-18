import { apiBase } from "../config";

export const createEmergency = async ({
  status,
  zipCode,
  startTime,
  leadResponder
}) => {
  let body = {
    status: status,
    zipCode: zipCode,
    startTime: startTime
  };

  if (leadResponder) {
    body.leadResponder = leadResponder;
  }

  return fetch(`${apiBase}/emergency`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify(body)
  }).then(result => {
    return result.json();
  });
};

export const getEmergencies = async () => {
  return fetch(`${apiBase}/emergency`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
