const express = require("express");
const GUN = require("gun");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(8081);

const gun = GUN({ web: server });

const controller = require("./api/controller")(gun);
const routes = require("./api/router")(controller);

app.get("/", (req, res) => {
  res.json({ working: true });
});

app.use("/api/v1", routes);
console.log("Running on port 8081");

// setTimeout(() => {
//   gun.get("name").put({
//     tag: "g",
//   });
// }, 5000);
