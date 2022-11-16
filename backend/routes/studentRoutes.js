const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { authenticate } = require("../utils/authenticate.js");

router
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.createStudent);

router.post("/login", studentController.logIn);

router.put("/update", authenticate, studentController.updateStudent);

router.get("/borrowedbooks", authenticate, studentController.getBorrowedBooks);

router.get("/:uuid", studentController.getStudent);

module.exports = router;
