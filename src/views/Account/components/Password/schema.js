export default {
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 4,
      maximum: 32,
      message: "must be at least 5 characters in length"
    }
  },
  confirm: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 4,
      maximum: 32,
      message: "^Password must be at least 5 characters in length"
    },
    equality: {
      attribute: "password",
      message: "^Passwords do not match"
    }
  }
};
