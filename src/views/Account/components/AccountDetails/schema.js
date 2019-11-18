export default {
  fname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  lname: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  username: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64
    }
  }
};
