const express = require("express");
const router = express.Router();


const UserController = require("../controllers/users")

router.post("/signup", UserController.user_sign);

router.delete("/:userId", UserController.user_del)

router.post("/login", UserController.user_login)

module.exports = router;