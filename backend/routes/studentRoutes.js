const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const librarianController = require("../controllers/librarianController");
const {
  authenticate,
  authenticateLibrarian,
} = require("../utils/authenticate.js");

router
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.createStudent);

router.post("/login", studentController.logIn);

router.put("/update", authenticate, studentController.updateStudent);

router.get("/borrowedbooks", authenticate, studentController.getBorrowedBooks);

router.route("/request/:id", authenticate, studentController.cancelRequest);

router.post(
  "/borrowedbooks/:id",
  authenticate,
  studentController.requestDateExtension
);

router.get("/:uuid", studentController.getStudent);

module.exports = router;
