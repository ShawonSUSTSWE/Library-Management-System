"use strict";
const Librarian = require("../models/librarianModel");
const { v4: uuidv4 } = require("uuid");
const url = require("url");

exports.getAllRequests = (req, res, next) => {
  let role = "student";
  console.log(url.parse(req.url).pathname);
  Librarian.getRequest(role, (err, result) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getRequest = (req, res, next) => {
  const reqID = req.params.id;
};

exports.acceptRequest = (req, res, next) => {};

exports.rejectRequest = (req, res, next) => {};
