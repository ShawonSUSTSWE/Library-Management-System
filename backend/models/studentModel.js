const dbConnection = require("../config/db.config");
const bcrypt = require("bcrypt");

function defaultError(err) {
  console.log("Error: ", err);
}

class Student {
  constructor(regNo, name, email, password, dept, picture) {
    this.regNo = regNo;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dept = dept;
    this.picture = picture;
  }

  static createStudent(studentData, result) {
    bcrypt.hash(studentData.password, 12).then((hash) => {
      studentData.password = hash;
      dbConnection.query(
        "INSERT INTO tbl_student SET ?",
        studentData,
        (err, res) => {
          if (err) {
            defaultError(err);
            result(err, null);
          } else {
            result(null, res);
          }
        }
      );
    });
  }

  static searchStudentByID(regNo, result) {
    dbConnection.query(
      "SELECT * FROM tbl_student WHERE regNo = ?",
      regNo,
      (err, res) => {
        if (err) {
          defaultError(err);
          result(err, null);
        } else {
          //console.log(res);
          result(null, res[0]);
        }
      }
    );
  }

  static searchStudentByEmail(email, result) {
    dbConnection.query(
      "SELECT * FROM tbl_student WHERE email = ?",
      email,
      (err, res) => {
        if (err) {
          defaultError(err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  static getStudents(result) {
    dbConnection.query("SELECT * FROM tbl_student", (err, res) => {
      if (err) {
        defaultError(err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getBorrowedBooks(regNo, result) {
    const query = `SELECT tbl_book.accessionNo, tbl_book.title, tbl_book.author, tbl_book.coverpic 
    FROM tbl_book 
    JOIN tbl_borrow 
    ON tbl_borrow.accessionNo = tbl_book.accessionNo 
    WHERE tbl_borrow.regNo = ?`;
    dbConnection.query(query, regNo, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static updateStudent(studentData, result) {
    dbConnection.query(
      "UPDATE tbl_student SET name = ?, password = ?, dept = ?, picture = ? WHERE regNo = ?",
      [
        studentData.name,
        studentData.password,
        studentData.dept,
        studentData.picture,
        studentData.regNo,
      ],
      (err, res) => {
        if (err) {
          defaultError(err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = Student;
