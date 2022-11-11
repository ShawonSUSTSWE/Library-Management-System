const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { authenticate } = require("../utils/authenticate.js");

router.route("/").get(bookController.getBooks).post(bookController.addBook);

router.get("/search", bookController.searchBookByCriteria);

router
  .route("/:id")
  .get(bookController.getBook)
  .post(authenticate, bookController.borrowBook)
  .delete(bookController.deleteBook);

module.exports = router;
