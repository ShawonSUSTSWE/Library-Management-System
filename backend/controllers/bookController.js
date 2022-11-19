"use strict";
const Book = require("../models/bookModel");
const { v4: uuidv4 } = require("uuid");

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
      // for (let i = 0; i < result.length; i++) {
      //   const date = String(result[i].date);
      //   result[i].date = date.slice(4, 15);
      // }
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

exports.requestBook = (req, res, next) => {
  let person = "student";
  let regNo = 0;
  let ID = 0;
  if (req.userData.roleID === 1) {
    regNo = req.userData.ID;
  } else if (req.userData.roleID === 2) {
    ID = req.userData.ID;
    person = "teacher";
  }
  //console.log(req.userData);
  const accessionNo = req.params.id;
  const { requestDate } = req.body;
  let requestData = {};
  const reqID = uuidv4();
  if (person === "student") {
    requestData = {
      reqID: reqID,
      regNo: regNo,
      accessionNo: accessionNo,
      requestDate: requestDate,
    };
  } else {
    requestData = {
      reqID: reqID,
      ID: ID,
      accessionNo: accessionNo,
      requestDate: requestDate,
    };
  }
  Book.requestBook(requestData, person, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (result) {
        res.status(200).json({
          message: "Your Request has been placed Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          message: "Book is currently not available",
        });
      }
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
