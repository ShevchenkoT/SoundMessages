const player = require("play-sound")((opts = {}));
const path = require("path");
const fs = require("fs");
const { SOUNDS_FOLDER } = require("../../environment.config");

function postRequest(req, res) {
  const { sound } = req.body;
  const allSounds = getAllSounds();
  const responseObj = { status: "success" };
  const currentSound = allSounds.includes(sound) ? sound : null;

  if (currentSound) {
    const soundPath = path.join(__dirname, SOUNDS_FOLDER, currentSound);
    player.play(soundPath, playerCallback);
  } else {
    responseObj.status = "denied";
    console.info("Info: Can't find sound");
  }
  res.end(JSON.stringify(responseObj));
}

function playerCallback(err) {
  if (err) throw err;
}

function getAllSounds() {
  const soundsPath = path.join(__dirname, SOUNDS_FOLDER);
  return fs.readdirSync(soundsPath, (err, files) => {
    if (err) throw err;
    return files;
  });
}

module.exports = { postRequest, playerCallback, getAllSounds };
