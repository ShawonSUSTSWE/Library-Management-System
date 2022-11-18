"use strict";
const Librarian = require("../models/librarianModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.getAllRequests = (req, res, next) => {
  let role = "student";
  if (req.path.includes("teacher")) {
    role = "teacher";
  }
  Librarian.getRequests(role, (err, result) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getRequest = (req, res, next) => {
  const reqID = req.params.id;
  let role = "student";
  if (req.path.includes("teacher")) {
    role = "teacher";
  }
  Librarian.getRequest(reqID, role, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.logIn = (req, res, next) => {
  const { email, password } = req.body;
  Librarian.searchLibrarianByEmail(email, (err, res_db) => {
    if (err) {
      res.status(400).json({
        message: "Bad Request",
      });
    }
    if (!res_db) {
      res.status(401).json({
        data: "Invalid Email or password",
      });
    } else {
      if (!bcrypt.compareSync(password, res_db.password)) {
        res.status(401).json({
          message: "Invalid Email or password",
        });
      } else {
        console.log(res_db);
        let token = jwt.sign(
          {
            email: res_db.email,
            name: res_db.name,
            roleID: res_db.roleID,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({
          message: "Signed in!!",
          token: token,
        });
      }
    }
  });
};

exports.acceptRequest = (req, res, next) => {};

exports.rejectRequest = (req, res, next) => {};