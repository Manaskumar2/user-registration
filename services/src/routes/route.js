const express = require("express");
const router = express.Router();

const { signUp, logIn } = require("../controller/usercontroller")
const { auth } = require("../authentication/auth")


router.post("/registration",signUp)
router.post("/login", logIn)



module.exports = router;