const dbConnection = require("../config/db.config");

class Librarian {
  static getRequest(role, result) {
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
}

module.exports = Librarian;
