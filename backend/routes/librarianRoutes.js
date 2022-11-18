const express = require("express");
const router = express.Router();
const librarianController = require("../controllers/librarianController");
const { authenticateLibrarian } = require("../utils/authenticate");

router.get("/request/teachers", librarianController.getAllRequests);

router.get("/request/students", librarianController.getAllRequests);

router.use(authenticateLibrarian);

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

module.exports = router;
