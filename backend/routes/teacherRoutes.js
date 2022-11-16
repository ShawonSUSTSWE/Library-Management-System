const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { authenticate } = require("../utils/authenticate.js");

router
  .route("/")
  .get(teacherController.getTeachers)
  .post(teacherController.createTeacher);

router.post("/login", teacherController.logIn);

router.put("/update", authenticate, teacherController.updateTeacher);

router.get("/borrowedbooks", authenticate, teacherController.getBorrowedBooks);

router.get("/:uuid", teacherController.getTeacher);

module.exports = router;
