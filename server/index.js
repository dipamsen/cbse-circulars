const express = require("express");
const cors = require("cors");
const { ExamCirculars } = require("./scraper");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    cbse: "api",
  });
});

app.get("/exam-circulars", async (req, res) => {
  res.json(await ExamCirculars());
});

app.listen(1035, () => console.log("Listening on 1035"));
