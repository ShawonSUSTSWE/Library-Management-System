const dbConnection = require("../config/db.config");

class Librarian {
  static getRequests(role, result) {
    let tableName = "tbl_request";
    if (role === "teacher") tableName += "_teacher";
    const query = `SELECT * FROM ${tableName}`;
    dbConnection.query(query, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
  static getRequest(reqID, role, result) {
    let tableName = "tbl_request";
    if (role === "teacher") tableName += "_teacher";
    const query = `SELECT * FROM ${tableName} WHERE reqID = ?`;
    dbConnection.query(query, reqID, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static searchLibrarianByEmail(email, result) {
    dbConnection.query(
      "SELECT * FROM tbl_librarian where email = ?",
      email,
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
}

module.exports = Librarian;
