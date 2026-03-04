const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Halo boss ready parah nih awak");
});

app.get("/health", (req, res) => {
  res.send("awak sehat brayy");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
