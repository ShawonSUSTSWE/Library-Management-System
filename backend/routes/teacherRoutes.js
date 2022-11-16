const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { authenticateTeacher } = require("../utils/authenticate.js");

router
  .route("/")
  .get(teacherController.getTeachers)
  .post(teacherController.createTeacher);

router.post("/login", teacherController.logIn);

router.put("/update", authenticateTeacher, teacherController.updateTeacher);

router.get(
  "/borrowedbooks",
  authenticateTeacher,
  teacherController.getBorrowedBooks
);

router.get("/:uuid", teacherController.getTeacher);

module.exports = router;
