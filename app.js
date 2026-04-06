const express = require("express");
const handleSapa = require("./handlers/greeting/sapa");

const app = express();

app.get("/", (req, res) => {
  res.send("Halo boss ready parah nih awak");
});

app.get("/health", (req, res) => {
  res.send("awak sehat brayy");
});

// Greeting endpoint
app.get("/sapa", handleSapa);

module.exports = app;
