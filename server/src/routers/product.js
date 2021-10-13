const express = require("express");
const router = express.Router();

const { show } = require("../controllers/products");

router.get("/show", show);

module.exports = router;
