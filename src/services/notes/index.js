// SJSU CMPE 138Fall2019 TEAM13

import { apiBase } from "../config";

export const createEmergencyNote = async params => {
  let body = {
    eid: params.emergencyId,
    note: params.note,
    employeeId: params.employeeId
  };

  return fetch(`${apiBase}/emergency-note`, {
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
