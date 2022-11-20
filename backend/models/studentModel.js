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
    this.roleID = 1;
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
    const query = `SELECT tbl_borrow.issueID, tbl_book.accessionNo, tbl_book.title, tbl_book.author, tbl_book.coverpic FROM tbl_book JOIN tbl_borrow ON tbl_borrow.accessionNo = tbl_book.accessionNo WHERE tbl_borrow.regNo = ?`;
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

  static requestDateExtension(issueID, result) {
    let message = "Error";
    dbConnection.query(
      "SELECT * FROM tbl_borrow WHERE issueID = ?",
      issueID,
      (err, res) => {
        if (err) {
          result(err, null, message);
        } else {
          console.log(Object.keys(res).length);
          if (Object.keys(res[0]).length !== 0) {
            //console.log("Hi");
            const dueDate = res[0].dueDate;
            //console.log(res[0].dueDate);
            const ts = Date.now();
            const currentDate = new Date(ts);
            if (dueDate > currentDate) {
              dueDate.setDate(dueDate.getDate() + 7);
              const requestData = {
                issueID: issueID,
                regNo: res[0].regNo,
                accessionNo: res[0].accessionNo,
                requestedDate: dueDate,
              };
              console.log(requestData);
              dbConnection.query(
                "INSERT INTO tbl_request_extension SET ?",
                requestData,
                (insertionError, insertionResponse) => {
                  if (insertionError) {
                    result(insertionError, null, message);
                  } else {
                    message = "Success";
                    result(null, insertionResponse, message);
                  }
                }
              );
            } else {
              message = "Failure";
              result(null, null, message);
            }
          } else {
            result(null, null, message);
          }
        }
      }
    );
  }
}

module.exports = Student;
