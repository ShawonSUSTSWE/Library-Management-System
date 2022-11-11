const dbConnection = require("../config/db.config");

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
    this.date = date;
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

  static borrowBook(borrowData, result) {
    dbConnection.query(
      "INSERT INTO tbl_borrow SET ?",
      borrowData,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = Book;
