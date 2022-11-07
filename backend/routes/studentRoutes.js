const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.createStudent);

router.post("/login", studentController.logIn);

router.put("/update", studentController.updateStudent);

module.exports = router;
