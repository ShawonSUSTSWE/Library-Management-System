"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");

exports.createTeacher = (req, res, next) => {
  const { ID, name, email, password, dept, picture } = req.body;
  const teacher = new Teacher(ID, name, email, password, dept, picture);
  Teacher.createTeacher(teacher, (err, resultteacher) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(resultteacher);
      let token = jwt.sign(
        {
          ID: resultteacher.ID,
          email: resultteacher.email,
          name: resultteacher.name,
          roleID: resultteacher.roleID,
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

exports.getTeachers = (req, res, next) => {
  Teacher.getTeachers((err, teacher) => {
    if (err) res.send(err);
    console.log(teacher);
    res.status(200).json({
      message: "Successfully fetched",
      data: teacher,
    });
  });
};

exports.getTeacher = (req, res, next) => {
  Teacher.searchTeacherByID(req.params.uuid, (err, teacher) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(teacher);
    }
  });
};

exports.logIn = (req, res, next) => {
  //checker(validationResult(req));
  const { ID, password } = req.body;
  Teacher.searchTeacherByID(ID, (err, res_db) => {
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
      console.log(password, res_db.password);
      if (!bcrypt.compareSync(password, res_db.password)) {
        res.status(401).json({
          message: "Invalid Registration Number or password",
        });
      } else {
        console.log(res_db);
        let token = jwt.sign(
          {
            ID: res_db.ID,
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

exports.getBorrowedBooks = (req, res, next) => {
  const { ID } = req.userData;
  Teacher.getBorrowedBooks(ID, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.updateTeacher = (req, res, next) => {
  let testPassed = false;
  const { ID } = req.userData;
  const { name, oldPassword, newPassword, picture } = req.body;
  Teacher.searchTeacherByID(ID, (err, teacher) => {
    if (err) {
      res.status(404).json(err);
    } else {
      if (newPassword) {
        if (bcrypt.compareSync(oldPassword, teacher.password)) {
          if (oldPassword === newPassword) {
            res.status(400).json({
              message: "New Password should not match your old Password",
            });
            testPassed = false;
          } else if (newPassword.length < 6) {
            res.status(400).json({
              message: "New Password should at least be 6 characters long",
            });
            testPassed = false;
          } else {
            teacher.password = bcrypt.hashSync(newPassword, 12);
          }
        } else {
          res.status(401).json({
            message: "Password does not match",
          });
          testPassed = false;
        }
      }
      if (name) {
        teacher.name = name;
      }
      if (picture) {
        teacher.picture = picture;
      }
      if (testPassed) {
        Teacher.updateTeacher(teacher, (error, updatedTeacher) => {
          if (error) {
            res.status(500).json(err);
          } else {
            res.status(200).json({
              message: "Successfully Updated",
              data: updatedTeacher,
            });
          }
        });
      }
    }
  });
};
