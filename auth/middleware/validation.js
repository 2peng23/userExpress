const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  var token = req.get("authorization");
  if (!token) {
    res.json({
      success: 0,
      message: "Access denied! Unauthorized user.",
    });
  }

  token = token.slice(7); //remove the first seven chars including space "riorio "
  //verify the secret key
  verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      res.json({
        success: 0,
        message: "Invalid token.",
      });
    } else {
      next();
    }
  });
};

const token = {
  checkToken,
};
module.exports = token;
