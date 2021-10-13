const express = require("express");
const router = express.Router();

const { signUp, logIn } = require("../controllers/users");

router.post("/sign-up", signUp);
router.post("/log-in", logIn);

module.exports = router;
