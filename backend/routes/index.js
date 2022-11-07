const express = require("express");
const studentRoutes = require("./studentRoutes");
const bookRoutes = require("./bookRoutes");

const router = express.Router();

router.use("/students", studentRoutes);
router.use("/books", bookRoutes);

module.exports = router;
