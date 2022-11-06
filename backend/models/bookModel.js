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
    pub,
    dateOfPub,
    source,
    binding,
    pagination,
    price,
    billNoDate,
    isbn
  ) {
    this.date = date;
    this.accessionNo = accessionNo;
    this.author = author;
    this.title = title;
    this.edition = edition;
    this.volume = volume;
    this.placeOfPub = placeOfPub;
    this.pub = pub;
    this.dateOfPub = dateOfPub;
    this.source = source;
    this.binding = binding;
    this.pagination = pagination;
    this.price = price;
    this.billNoDate = billNoDate;
    this.isbn = isbn;
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
    dbConnection.query(
      "SELECT * FROM tbl_book WHERE ? = ?",
      criteria,
      value,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
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

  static deleteBook(bookData, result) {
    dbConnection.query("DELETE * FROM tbl_book WHERE accessionNo = ?"),
      bookData,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      };
  }
}

module.exports = Book;
