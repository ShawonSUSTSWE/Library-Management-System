const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.route("/").get(bookController.getBooks).post(bookController.addBook);

router.get("/search", bookController.searchBookByCriteria);

router
  .route("/:id")
  .get(bookController.getBook)
  .delete(bookController.deleteBook);

module.exports = router;
