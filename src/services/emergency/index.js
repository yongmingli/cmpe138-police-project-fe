import { apiBase } from "../config";
// SJSU CMPE 138Fall2019 TEAM13

import store from "../../redux/store";


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

export const updateEmergency = async ({
  emergency_id,
  zipcode,
  lead_responder
}) => {
  let body = {
    emergencyId: emergency_id,
    zipCode: zipcode,
    leadResponder: lead_responder.e_id
  };

  return fetch(`${apiBase}/emergency`, {
    method: "PUT",
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
  const user = store.getState().user.user;
  console.log("asd", user);
  return fetch(`${apiBase}/emergency${user.type === "POLICE_OFFICER" ? `?eid=${user.e_id}` : ""}`, {
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

export const searchEmergency = async ({ emergency_name }) => {
  const user = store.getState().user.user;
  return fetch(`${apiBase}/emergency-search?${user.type === "POLICE_OFFICER" ? `&eid=${user.e_id}&` : ""}desired_search=${emergency_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};

export const assignLead = async({emergency_id, lead_responder }) => {
  const body = {
    emergencyId: emergency_id,
    leadResponder: lead_responder.e_id
  };
  return fetch(`${apiBase}/emergency-assign-lead`, {
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

export const assignResponder = async({emergency_id, responder }) => {
  const body = {
    emergencyId: emergency_id,
    responder: responder.e_id
  };

  console.log(body);
  return fetch(`${apiBase}/emergency-assign-responder`, {
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

export const getEmergencyDetails = async eid => {
  return fetch(`${apiBase}/emergency-detail?eid=${eid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
