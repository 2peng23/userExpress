const guestService = require("./service");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// getEmail
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  guestService.login(email, (error, response) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error " + error,
      });
    }
    if (!response[0]) {
      return res.status(404).json({
        success: 0,
        message: "User with the same email not found",
      });
    }
    var userPassword = response[0].password;
    const isSame = compareSync(password, userPassword);
    if (!isSame) {
      return res.status(500).json({
        success: 0,
        message: "Invalid Password",
      });
    } else {
      userPassword = undefined;
      const jwt = sign(
        {
          response,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        success: 1,
        message: "Login Success!",
        token: jwt,
      });
    }
  });
};

const guestController = {
  login,
};

module.exports = guestController;
