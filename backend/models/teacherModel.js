const dbConnection = require("../config/db.config");
const bcrypt = require("bcrypt");

function defaultError(err) {
  console.log("Error: ", err);
}

class Teacher {
  constructor(ID, name, email, password, dept, picture) {
    this.ID = ID;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dept = dept;
    this.picture = picture;
    this.roleID = 2;
  }

  static createTeacher(teacherData, result) {
    bcrypt.hash(teacherData.password, 12).then((hash) => {
      teacherData.password = hash;
      dbConnection.query(
        "INSERT INTO tbl_teacher SET ?",
        teacherData,
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

  static searchTeacherByID(ID, result) {
    dbConnection.query(
      "SELECT * FROM tbl_teacher WHERE ID = ?",
      ID,
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

  static searchTeacherByEmail(email, result) {
    dbConnection.query(
      "SELECT * FROM tbl_teacher WHERE email = ?",
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

  static getTeachers(result) {
    dbConnection.query("SELECT * FROM tbl_teacher", (err, res) => {
      if (err) {
        defaultError(err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getBorrowedBooks(ID, result) {
    const query = `SELECT tbl_book.accessionNo, tbl_book.title, tbl_book.author, tbl_book.coverpic 
    FROM tbl_book 
    JOIN tbl_borrow_teacher 
    ON tbl_borrow_teacher.accessionNo = tbl_book.accessionNo 
    WHERE tbl_borrow_teacher.ID = ?`;
    dbConnection.query(query, ID, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static updateTeacher(teacherData, result) {
    dbConnection.query(
      "UPDATE tbl_teacher SET name = ?, password = ?, dept = ?, picture = ? WHERE ID = ?",
      [
        teacherData.name,
        teacherData.password,
        teacherData.dept,
        teacherData.picture,
        teacherData.ID,
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

module.exports = Teacher;
