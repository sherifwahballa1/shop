const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config({ path: "./.env" });
const { Error4o4, Error500 } = require("./modules/errors");

// run the following in the first time when create schema and relationships
// ***********************************************************
// ***********************************************************
// const db = require("./db_connection/sequelize.config");
// db.sequelize.sync().then(() => {
//   console.log("Drop and re-sync db.");
// });
// ***********************************************************
// ***********************************************************

const productsRouter = require("./routes/product");

// ----------------- for testing ------------------
const providerRouter = require("./routes/provider");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(morgan("tiny"));

app.use("/api/products", productsRouter);

// ********* provider routers for testing **********
app.use("/api/providers", providerRouter);

// handle error 404 not found apis
app.use(Error4o4);
// handle error 500
app.use(Error500);

const PORT = process.env.PORT || 5000;
app.set("port", PORT);

app.listen(PORT, () => {
  console.log(`App Running on port ${app.get("port")}`);
});
