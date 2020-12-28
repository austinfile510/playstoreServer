const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("common"));

const playstore = require("./playstore.js");

app.get("/apps", (req, res) => {

  const { genres = "", sort } = req.query;


  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  let results = playstore.filter(app =>
    app.Genres.toLowerCase().includes(genres.toLowerCase()));
  
    if (sort) {
        results = results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] <b[sort] ? -1 : 0;
        });
    };


  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on Port 8000");
});
