// Mock data
import users from "data/users";
import orders from "data/orders";
import { apiBase } from "../config";

function lookupUser(user) {
  const userCopy = JSON.parse(JSON.stringify(user));
  const userOrders = userCopy.orders.map(id =>
    orders.find(order => order.id === id)
  );
  const userMoneySpent = userCopy.orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  userCopy.orders = userOrders;
  userCopy.moneySpent = userMoneySpent;

  return userCopy;
}

export const getUsers = (limit = 10) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const usersLookup = users.slice(0, limit).map(lookupUser);

      resolve({
        users: usersLookup,
        usersTotal: users.length
      });
    }, 700);
  });
};

export const getUser = id => {
  return fetch(`${apiBase}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(result => {
    return result.json();
  });
};

export const createUser = ({ login, password, email }) => {
  return fetch(`${apiBase}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: login,
      password: password,
      email: email
    })
  }).then(result => {
    return result.json();
  });
};

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
