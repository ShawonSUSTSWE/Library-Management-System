const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { authenticateStudent } = require("../utils/authenticate.js");

router
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.createStudent);

router.post("/login", studentController.logIn);

router.put("/update", authenticateStudent, studentController.updateStudent);

router.get(
  "/borrowedbooks",
  authenticateStudent,
  studentController.getBorrowedBooks
);

router.get("/:uuid", studentController.getStudent);

module.exports = router;
