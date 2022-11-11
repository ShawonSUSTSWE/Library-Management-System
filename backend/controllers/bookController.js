"use strict";
const Book = require("../models/bookModel");

exports.addBook = (req, res, next) => {
  const {
    date,
    accessionNo,
    author,
    title,
    edition,
    volume,
    placeOfPub,
    publisher,
    dateOfPub,
    source,
    binding,
    pagination,
    price,
    billNoDate,
    ISBN,
  } = req.body;
  const book = new Book(
    date,
    accessionNo,
    author,
    title,
    edition,
    volume,
    placeOfPub,
    publisher,
    dateOfPub,
    source,
    binding,
    pagination,
    price,
    billNoDate,
    ISBN
  );
  Book.addBook(book, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.getBooks = (req, res, next) => {
  Book.getBooks((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getBook = (req, res, next) => {
  const accessionNo = req.params.id;
  Book.searchBookByCriteria("accessionNo", accessionNo, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.searchBookByCriteria = (req, res, next) => {
  const { criteria, value } = req.body;
  Book.searchBookByCriteria(criteria, value, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.borrowBook = (req, res, next) => {
  const { regNo } = req.userData;
  const accessionNo = req.params.id;
  const { borrowDate, dueDate } = req.body;
  const borrowData = {
    regNo: regNo,
    accessionNo: accessionNo,
    borrowDate: borrowDate,
    dueDate: dueDate,
  };
  Book.borrowBook(borrowData, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        message: "Book Borrowed Successfully",
        result: result,
      });
    }
  });
};

exports.deleteBook = (req, res, next) => {
  const accessionNo = req.params.id;
  Book.deleteBook(accessionNo, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};
