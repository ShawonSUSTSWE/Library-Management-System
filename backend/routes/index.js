const express = require("express");
const studentRoutes = require("./studentRoutes");
const bookRoutes = require("./bookRoutes");
const teacherRoutes = require("./teacherRoutes");
const librarianRoutes = require("./librarianRoutes");
const router = express.Router();

router.use("/students", studentRoutes);
router.use("/books", bookRoutes);
router.use("/teachers", teacherRoutes);
router.use("/librarian", librarianRoutes);

module.exports = router;
