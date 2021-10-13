const express = require("express");
const router = express.Router();

const { show, order } = require("../controllers/products");

router.get("/show", show);
router.post("/order", order);

module.exports = router;
