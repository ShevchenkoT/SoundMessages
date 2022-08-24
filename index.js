const player = require("play-sound")((opts = {}));
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const SOUNDS_FOLDER = "sounds";

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Sever crush alert</h2>");
});

app.post("/alert", (req, res) => {
  try {
    const { sound } = req.body;
    const allSounds = getAllSounds();

    const currentSound = allSounds.includes(sound) ? sound : null;

    if (currentSound) {
      const soundPath = path.join(__dirname, SOUNDS_FOLDER, currentSound);
      player.play(soundPath, playerCallback);
    }
  } catch (error) {
    console.log("err");
  }
});

function getAllSounds() {
  return fs.readdirSync(SOUNDS_FOLDER, (err, files) => {
    if (err) throw err;
    return files;
  });
}

app.listen(PORT, () => {
  console.log("Server started...");
});
