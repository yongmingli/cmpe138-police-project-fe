import { apiBase } from "../config";

const emergencyStatus = {
  IN_PROGRESS: "IN_PROGRESS"
};

export const createEmergency = async ({
  zipCode,
  startTime,
  leadResponder
}) => {
  let body = {
    status: emergencyStatus.IN_PROGRESS,
    zipCode: zipCode,
    // TODO: leadResponder: leadResponder,
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

export const resolveEmergency = async emergency_id => {
  const body = {
    emergencyId: emergency_id
  };
  return fetch(`${apiBase}/emergency-resolve`, {
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

export const getNotesForEmergency = async emergency_id => {
  return fetch(`${apiBase}/emergency-note?eid=${emergency_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};

export const searchEmergency = async ({emergency_name}) =>{

  return fetch(`${apiBase}/emergency-search?desired_search=${emergency_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
