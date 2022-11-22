const express = require("express");
const router = express.Router();
const librarianController = require("../controllers/librarianController");
const { authenticateLibrarian } = require("../utils/authenticate");

router.post("/login", librarianController.logIn);

router.use(authenticateLibrarian);

router.get("/request/teachers", librarianController.getAllRequests);

router.get("/request/students", librarianController.getAllRequests);

router
  .route("/request/students/:id")
  .get(librarianController.getRequest)
  .post(librarianController.acceptRequest)
  .delete(librarianController.rejectRequest);

router
  .route("/request/teachers/:id")
  .get(librarianController.getRequest)
  .post(librarianController.acceptRequest)
  .delete(librarianController.rejectRequest);

router.get("/issue/students", librarianController.getAllIssues);

router.get("/issue/teachers", librarianController.getAllIssues);

router
  .route("/issue/students/:id")
  .get(librarianController.getExtensionRequest)
  .post(librarianController.acceptDateExtension)
  .delete(librarianController.rejectDateExtension);

router.post("/return/issue/students/:id", librarianController.returnBook);
router.post("/return/issue/teachers/:id", librarianController.returnBook);

module.exports = router;
