const { genSaltSync, hashSync } = require("bcrypt");
const userService = require("./service");

// create user
const createUser = (req, res) => {
  const body = req.body;
  console.log(body);
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  userService.create(body, (error, response) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error " + error,
      });
    }
    return res.status(200).json({
      success: 1,
      data: response,
    });
  });
};
// get all users
const getUsers = (req, res) => {
  userService.getUsers((error, response) => {
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
        message: "No user available",
      });
    }
    return res.status(200).json({
      success: 1,
      data: response,
    });
  });
};

// get specific user
const getUser = (req, res) => {
  const id = req.params.id;
  userService.getUser(id, (error, response) => {
    console.log(response);
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
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: 1,
      data: response,
    });
  });
};

// update user
const updateUser = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  userService.updateUser(id, body, (error, response) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error " + error,
      });
    }
    return res.status(200).json({
      success: 1,
      data: response,
    });
  });
};
// delete specific user
const deleteUser = (req, res) => {
  const id = req.params.id;
  userService.deleteUser(id, (error, response) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error " + error,
      });
    }
    return res.status(200).json({
      success: 1,
      data: response,
    });
  });
};
const userContoller = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

module.exports = userContoller;
