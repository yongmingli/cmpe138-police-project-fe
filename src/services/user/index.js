import { apiBase } from "../config";

export const createEmployee = ({ firstName, lastName, dob, type, username, password, phone }) => {
  return fetch(`${apiBase}/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      dob: dob.toJSON().substring(0,10),
      type: type,
      username: username,
      password: `${username}${dob.getYear()}`,
      phone: phone
    })
  }).then(result => {
    return result.json();
  });
};

export const updateEmployee = ({ eid, fname, lname }) => {
  return fetch(`${apiBase}/employee`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    },

    body: JSON.stringify({
      eid,
      firstName: fname,
      lastName: lname
    })
  }).then(result => {
    return result.json();
  });
};

export const updateUser = ({ id, firstName, lastName, email, password }) => {
  return fetch(`${apiBase}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  }).then(result => {
    return result.json();
  });
};

export const getEmployees = () => {
  return fetch(`${apiBase}/employee`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
