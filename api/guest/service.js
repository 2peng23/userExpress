// insert the database
const pool = require("../../config/db");

const login = (email, callBack) => {
  pool.query(
    `select * from user where email = ? limit 1`,
    [email],
    (error, response) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, response);
    }
  );
};
const guestService = {
  login,
};

module.exports = guestService;
