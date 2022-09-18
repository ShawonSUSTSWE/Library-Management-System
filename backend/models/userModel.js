const dbConnection = require("../config/db.config");
const bcrypt = require("bcrypt");

function defaultError(err) {
  console.log("Error: ", err);
}

class User {
  constructor(regNo, name, email, password, dept, picture) {
    this.regNo = regNo;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dept = dept;
    this.picture = picture;
  }
  static createUser(userData, result) {
    bcrypt.hash(userData.password, 12).then((hash) => {
      userData.password = hash;
      dbConnection.query("INSERT INTO tbl_user SET ?", userData, (err, res) => {
        if (err) {
          defaultError(err);
          result(err, null);
        } else {
          result(null, res);
        }
      });
    });
  }
  static searchUserByID(regNo, result) {
    dbConnection.query(
      "SELECT * FROM tbl_user WHERE regNo = ?",
      regNo,
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
  static getUsers(result) {
    dbConnection.query("SELECT * FROM tbl_user", (err, res) => {
      if (err) {
        defaultError(err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
  static updateUser(userData, result) {
    dbConnection.query(
      "UPDATE tbl_user SET name = ?, password = ?, dept = ?, picture = ? WHERE regNo = ?",
      [
        userData.name,
        userData.password,
        userData.dept,
        userData.picture,
        userData.regNo,
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

module.exports = User;
