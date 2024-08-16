const guestController = require('./contoller')
const router = require("express").Router();


router.post("/login", guestController.login);


module.exports = router;