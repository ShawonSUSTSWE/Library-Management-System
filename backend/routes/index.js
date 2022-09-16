const express = require("express");
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);

module.exports = router;
