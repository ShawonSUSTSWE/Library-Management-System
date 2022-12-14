"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/", routes);

app.use("*", (req, res) => {
  res.send("Sorry!! No Such Routes Exist!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
