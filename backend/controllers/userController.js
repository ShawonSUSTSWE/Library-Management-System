"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.createUser = (req, res, next) => {
  const { regNo, name, email, password, dept, picture } = req.body;
  const user = new User(regNo, name, email, password, dept, picture);
  User.createUser(user, (err, resultuser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(resultuser);
      let token = jsonwebtoken.sign(
        {
          regNo: resultuser.regNo,
          email: resultuser.email,
          name: resultuser.name,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "7d",
        }
      );
      res.status(201).json({
        message: "Successfully created",
        token: token,
      });
    }
  });
};

exports.getUsers = (req, res, next) => {
  User.getUsers((err, user) => {
    if (err) res.send(err);
    console.log(user);
    res.status(200).json({
      message: "Successfully fetched",
      data: user,
    });
  });
};

exports.getUser = (req, res, next) => {
  User.searchUserByID(req.params.uuid, (err, user) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(user);
    }
  });
};

exports.logIn = (req, res, next) => {
  checker(validationResult(req));
  const { regNo, password } = req.body;
  User.searchUserByID(email, (err, res_db) => {
    if (err) {
      res.status(400).json({
        message: "Bad Request",
      });
    }
    if (!res_db) {
      res.status(401).json({
        data: "Invalid Registration Number or password",
      });
    } else {
      if (!bcrypt.compareSync(password, res_db.password)) {
        res.status(401).json({
          message: "Invalid Registration Number or password",
        });
      } else {
        console.log(res_db);
        let token = jsonwebtoken.sign(
          {
            userID: res_db.userID,
            email: res_db.email,
            name: res_db.name,
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
