const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const librarianController = require("../controllers/librarianController");
const {
  authenticate,
  authenticateLibrarian,
} = require("../utils/authenticate.js");

router
  .route("/")
  .get(teacherController.getTeachers)
  .post(teacherController.createTeacher);

router.post("/login", teacherController.logIn);

router.put("/update", authenticate, teacherController.updateTeacher);

router.get("/borrowedbooks", authenticate, teacherController.getBorrowedBooks);

router.get("/requests2", librarianController.getAllRequests);

router
  .route("/request2/:id")
  .get(authenticateLibrarian, librarianController.getRequest)
  .post(authenticateLibrarian, librarianController.acceptRequest)
  .delete(authenticateLibrarian, librarianController.rejectRequest);

router.get("/:uuid", teacherController.getTeacher);

module.exports = router;
