const express = require("express");
const handleSapa = require("./handlers/greeting/sapa");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Halo boss ready parah nih awak");
});

app.get("/health", (req, res) => {
  res.send("awak sehat brayy");
});

// Greeting endpoint
app.get("/sapa", handleSapa);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
