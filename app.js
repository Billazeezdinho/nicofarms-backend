const express = require("express");
const app = express();
const contactRoutes =require("./routes/contactRoutes.js");

app.use(express.json());

app.use("/api/contact", contactRoutes);

module.exports = app;
