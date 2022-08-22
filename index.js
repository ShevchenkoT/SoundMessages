const player = require("play-sound")((opts = {}));
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");

// const port = process.env.PORT || 3000;
const soundPath = path.join(__dirname, "sounds", "alert.wav");

function playerCallback(err) {
  if (err) throw err;
  console.log("Play sound");
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  console.log("Post request");
  player.play(soundPath, playerCallback);
  res.send("<h1>Game Card API</h2>");
});

app.listen(3000, () => {
  console.log("Server started...");
});
