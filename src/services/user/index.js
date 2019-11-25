import { apiBase } from "../config";

export const createEmployee = ({
  firstName,
  lastName,
  dob,
  type,
  username,
  phone,
  zipCode
}) => {
  console.log(
    JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      dob: dob.toJSON().substring(0, 10),
      type: type,
      username: username,
      password: `${username}${dob.getYear()}`,
      phone: phone,
      zipCode: zipCode
    })
  );

  return fetch(`${apiBase}/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      dob: dob.toJSON().substring(0, 10),
      type: type,
      username: username,
      password: `${username}${dob.getYear()}`,
      phone: phone
    })
  }).then(result => {
    return result.json();
  });
};

export const updateEmployee = ({ eid, fname, lname, zipCode, password }) => {
  let body = {
    eid: eid,
    firstName: fname,
    lastName: lname,
  };
  if (zipCode) {
    body.zipCode = zipCode;
  }
  if (password) {
    body.password = password;
  }

  return fetch(`${apiBase}/employee`, {
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

export const searchEmployee = async ({ q, type, zip}) => {
  let param = `${apiBase}/employee-search?desired_search=${q}`;
  param = type ? param + `&type=${type}` : param;
  param = zip ? param + `&zip=${zip}` : param;
  console.log(param);
  return fetch(param, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt")
    }
  }).then(result => {
    return result.json();
  });
};
