const dbConnection = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

function selectTableName(role, tblType) {
  let tableName = "tbl_" + tblType;
  if (role === "teacher") tableName += "_teacher";
  return tableName;
}

class Librarian {
  static getRequests(role, result) {
    const tableName = selectTableName(role, "request");
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
    const tableName = selectTableName(role, "request");
    const query = `SELECT * FROM ${tableName} WHERE reqID = ?`;
    dbConnection.query(query, reqID, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
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

  static acceptRequest(reqID, role, result) {
    this.getRequest(reqID, role, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (Object.keys(res).length !== 0) {
          const ts = Date.now();
          const currentDate = new Date(ts);
          const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          const issueID = uuidv4();
          console.log(res);
          let issueData = {};
          if (role === "teacher") {
            issueData = {
              issueID: issueID,
              ID: res.ID,
              accessionNo: res.accessionNo,
              issueDate: currentDate,
              dueDate: dueDate,
            };
          } else {
            issueData = {
              issueID: issueID,
              regNo: res.regNo,
              accessionNo: res.accessionNo,
              issueDate: currentDate,
              dueDate: dueDate,
            };
          }
          this.deleteRequest(reqID, role, (deleteError, deleteResponse) => {
            if (deleteError) {
              result(deleteError, null);
            } else {
              this.issueBook(
                issueData,
                role,
                (insertionError, insertionResponse) => {
                  if (insertionError) {
                    result(insertionError, null);
                  } else {
                    result(null, insertionResponse);
                  }
                }
              );
            }
          });
        }
      }
    });
  }

  static rejectRequest(reqID, role, result) {
    this.getRequest(reqID, role, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        this.deleteRequest(reqID, role, (deleteError, deleteResponse) => {
          if (deleteError) {
            result(deleteError, null);
          } else {
            result(null, deleteResponse);
          }
        });
      }
    });
  }

  static deleteRequest(reqID, role, result) {
    const tableName = selectTableName(role, "request");
    const query = `DELETE FROM ${tableName} WHERE reqID = ?`;
    dbConnection.query(query, reqID, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static issueBook(issueData, role, result) {
    const tableName = selectTableName(role, "borrow");
    const query = `INSERT INTO ${tableName} SET ?`;
    dbConnection.query(query, issueData, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getAllIssues(role, result) {
    const tableName = selectTableName(role, "borrow");
    const query = `SELECT * FROM ${tableName}`;
    dbConnection.query(query, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getExtensionRequest(issueID, result) {
    dbConnection.query(
      "SELECT * FROM tbl_request_extension WHERE issueID = ?",
      issueID,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }

  static DateExtension(issueID, reqType, result) {
    let message = "Error";
    this.getExtensionRequest(issueID, (getError, getResponse) => {
      if (getError) {
        result(getError, null, message);
      } else {
        if (Object.keys(getResponse).length !== 0) {
          const newDate = getResponse.requestedDate;
          console.log(newDate);
          if (reqType === "accept") {
            dbConnection.query(
              "UPDATE tbl_borrow SET dueDate = ? WHERE issueID = ?",
              [newDate, issueID],
              (extensionError, extensionResponse) => {
                if (extensionError) {
                  result(extensionError, null, message);
                }
              }
            );
          }
          dbConnection.query(
            "DELETE FROM tbl_request_extension WHERE issueID = ?",
            issueID,
            (deleteError, deleteResponse) => {
              if (deleteError) {
                result(deleteError, null, message);
              } else {
                message = "Success";
                result(null, deleteResponse, message);
              }
            }
          );
        } else {
          message = "No Request";
          result(null, null, message);
        }
      }
    });
  }
}

module.exports = Librarian;
