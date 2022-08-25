const { PORT } = require("../../environment.config");
const app = require("../app");
const { postRequest } = require("./tools");

const port = process.env.PORT || PORT;

app.get("/", (req, res) => {
  res.send("<h1>Sound Messages</h1>");
});

app.post("/alert", postRequest);

app.listen(port, () => {
  console.info("Info: Server started...");
});
