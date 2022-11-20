"use strict";
const Librarian = require("../models/librarianModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

function determineRole(req) {
  let role = "student";
  if (req.path.includes("teacher")) {
    role = "teacher";
  }
  return role;
}

exports.getAllRequests = (req, res, next) => {
  const role = determineRole(req);
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
  const role = determineRole(req);
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

exports.acceptRequest = (req, res, next) => {
  const reqID = req.params.id;
  const role = determineRole(req);
  Librarian.acceptRequest(reqID, role, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.rejectRequest = (req, res, next) => {
  const reqID = req.params.id;
  const role = determineRole(req);
  Librarian.rejectRequest(reqID, role, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getAllIssues = (req, res, next) => {
  const role = determineRole(req);
  Librarian.getAllIssues(role, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getExtensionRequest = (req, res, next) => {
  const issueID = req.params.id;
  Librarian.getExtensionRequest(issueID, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.acceptDateExtension = (req, res, next) => {
  const issueID = req.params.id;
  Librarian.DateExtension(issueID, "accept", (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.rejectDateExtension = (req, res, next) => {
  const issueID = req.params.id;
  Librarian.DateExtension(issueID, "reject", (err, result, message) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (message === "Success") {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: message,
        });
      }
    }
  });
};
