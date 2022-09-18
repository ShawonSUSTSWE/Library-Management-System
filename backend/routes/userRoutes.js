const express = require("express");
const router = express.Router();
const userController = require("../controllers/studentController");

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.createStudent);

module.exports = router;
