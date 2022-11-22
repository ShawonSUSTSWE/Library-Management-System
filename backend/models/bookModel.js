const dbConnection = require("../config/db.config");
const Student = require("./studentModel");

function selectTableName(role, tblType) {
  let tableName = "tbl_" + tblType;
  if (role === "teacher") tableName += "_teacher";
  return tableName;
}

class Book {
  constructor(
    date,
    accessionNo,
    author,
    title,
    edition,
    volume,
    placeOfPub,
    publisher,
    dateOfPub,
    source,
    binding,
    pagination,
    price,
    billNoDate,
    ISBN
  ) {
    this.date = new Date(date);
    this.accessionNo = accessionNo;
    this.author = author;
    this.title = title;
    this.edition = edition;
    this.volume = volume;
    this.placeOfPub = placeOfPub;
    this.publisher = publisher;
    this.dateOfPub = dateOfPub;
    this.source = source;
    this.binding = binding;
    this.pagination = pagination;
    this.price = price;
    this.billNoDate = billNoDate;
    this.ISBN = ISBN;
  }

  static addBook(bookData, result) {
    dbConnection.query("INSERT INTO tbl_book SET ?", bookData, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static searchBookByCriteria(criteria, value, result) {
    console.log(criteria, value);
    const query = `SELECT * FROM tbl_book WHERE ${criteria} = ?`;
    dbConnection.query(query, value, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getBooks(result) {
    dbConnection.query("SELECT * FROM tbl_book", (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static deleteBook(accessionNo, result) {
    dbConnection.query(
      "DELETE FROM tbl_book WHERE accessionNo = ?",
      accessionNo,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  static checkifFined(regNo, result) {
    const query =
      "SELECT * FROM tbl_fine WHERE regNo = ? AND paymentDate IS NULL";
    dbConnection.query(query, regNo, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static requestBook(requestData, role, result) {
    let message = "Error";
    const tableName = selectTableName(role, "request");
    this.checkBookAvailability(
      requestData.accessionNo,
      (searchError, searchResponse) => {
        if (searchError) {
          result(searchError, null, message);
        } else {
          if (Object.keys(searchResponse).length === 0) {
            let ID = 0;
            if (role === "student") {
              ID = requestData.regNo;
              this.checkifFined(ID, (fineError, fineResponse) => {
                if (fineError) {
                  result(fineError, null, message);
                } else {
                  if (Object.keys(fineResponse).length !== 0) {
                    message = "Pay Previous Fine";
                    result(null, fineResponse, message);
                  }
                }
              });
            } else {
              ID = requestData.ID;
            }
            this.checkIfAlreadyIssued(ID, role, (issueError, issueResponse) => {
              if (issueError) {
                result(issueError, null, message);
              } else {
                console.log(issueResponse);
                if (Object.keys(issueResponse).length === 0) {
                  this.checkIfAlreadyRequested(
                    ID,
                    role,
                    (requestError, requestResponse) => {
                      if (requestError) {
                        result(requestError, null, message);
                      } else {
                        if (Object.keys(requestResponse).length === 0) {
                          const query = `INSERT INTO ${tableName} SET ?`;
                          dbConnection.query(query, requestData, (err, res) => {
                            if (err) {
                              result(err, null, message);
                            } else {
                              message = "Successful";
                              result(null, res, message);
                            }
                          });
                        } else {
                          message = "You already have a request";
                          result(null, null, message);
                        }
                      }
                    }
                  );
                } else {
                  message = "Return Previous Book";
                  result(null, null, message);
                }
              }
            });
          } else {
            message = "No Book Found";
            result(null, searchResponse, message);
          }
        }
      }
    );
  }

  static checkIfAlreadyRequested(ID, role, result) {
    let param1 = "regNo";
    const tblName = selectTableName(role, "request");
    if (role === "teacher") {
      param1 = "ID";
    }
    const query = `SELECT * FROM ${tblName} WHERE ${param1} = ?`;
    dbConnection.query(query, ID, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static checkIfAlreadyIssued(ID, role, result) {
    let param1 = "regNo";
    const tblName = selectTableName(role, "borrow");
    if (role === "teacher") {
      param1 = "ID";
    }
    const query = `SELECT * FROM ${tblName} WHERE ${param1} = ? AND returnDate IS NULL`;
    dbConnection.query(query, ID, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static checkBookAvailability(accessionNo, result) {
    let tableName = "tbl_borrow";
    const query = `SELECT * FROM ${tableName} WHERE accessionNo = ? AND returnDate IS NULL`;
    dbConnection.query(query, accessionNo, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (Object.keys(res).length !== 0) {
          result(null, res);
        } else {
          tableName += "_teacher";
          const queryNext = `SELECT * FROM ${tableName} WHERE accessionNo = ? AND returnDate IS NULL`;
          dbConnection.query(
            queryNext,
            accessionNo,
            (errorNext, responseNext) => {
              if (errorNext) {
                result(errorNext, null);
              } else {
                result(null, responseNext);
              }
            }
          );
        }
      }
    });
  }
}

module.exports = Book;
