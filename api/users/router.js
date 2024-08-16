const userContoller = require("./contoller");
const router = require("express").Router();
const token = require("../../auth/middleware/validation"); //middleware

router.get("/", token.checkToken, userContoller.getUsers);
router.get("/:id", token.checkToken, userContoller.getUser);
router.patch("/:id", token.checkToken, userContoller.updateUser);
router.post("/create", token.checkToken, userContoller.createUser);
router.delete("/:id", token.checkToken, userContoller.deleteUser);

module.exports = router;
