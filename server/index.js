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

const PORT = process.env.PORT || 1035;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
