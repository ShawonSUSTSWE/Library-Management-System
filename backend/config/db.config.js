"use strict";

const mysql = require("mysql");
require("dotenv").config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

dbConnection.connect((err) => {
  if (err) {
    console.log(`Database error: ${err}`);
    throw err;
  }
  console.log("Database connected!");
});

module.exports = dbConnection;
