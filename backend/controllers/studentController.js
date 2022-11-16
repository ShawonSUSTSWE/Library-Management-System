"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");

exports.createStudent = (req, res, next) => {
  const { regNo, name, email, password, dept, picture } = req.body;
  const student = new Student(regNo, name, email, password, dept, picture);
  Student.createStudent(student, (err, resultstudent) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(resultstudent);
      let token = jwt.sign(
        {
          regNo: resultstudent.regNo,
          email: resultstudent.email,
          name: resultstudent.name,
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

exports.getStudents = (req, res, next) => {
  Student.getStudents((err, student) => {
    if (err) res.send(err);
    console.log(student);
    res.status(200).json({
      message: "Successfully fetched",
      data: student,
    });
  });
};

exports.getStudent = (req, res, next) => {
  Student.searchStudentByID(req.params.uuid, (err, student) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(student);
    }
  });
};

exports.logIn = (req, res, next) => {
  //checker(validationResult(req));
  const { regNo, password } = req.body;
  Student.searchStudentByID(regNo, (err, res_db) => {
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
            regNo: res_db.regNo,
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

exports.getBorrowedBooks = (req, res, next) => {
  const { regNo } = req.userData;
  Student.getBorrowedBooks(regNo, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.updateStudent = (req, res, next) => {
  let testPassed = false;
  const { regNo } = req.userData;
  const { name, oldPassword, newPassword, picture } = req.body;
  Student.searchStudentByID(regNo, (err, student) => {
    if (err) {
      res.status(404).json(err);
    } else {
      if (newPassword) {
        if (bcrypt.compareSync(oldPassword, student.password)) {
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
            student.password = bcrypt.hashSync(newPassword, 12);
          }
        } else {
          res.status(401).json({
            message: "Password does not match",
          });
          testPassed = false;
        }
      }
      if (name) {
        student.name = name;
      }
      if (picture) {
        student.picture = picture;
      }
      if (testPassed) {
        Student.updateStudent(student, (error, updatedStudent) => {
          if (error) {
            res.status(500).json(err);
          } else {
            res.status(200).json({
              message: "Successfully Updated",
              data: updatedStudent,
            });
          }
        });
      }
    }
  });
};
