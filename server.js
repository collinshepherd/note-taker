const express = require("express");
const path = require("path");
const api = require("./routes/index");
const uuid = require("./helpers/uuid");
const { clog } = require("./middleware/clog");
const favicon = require("express-favicon");

const PORT = process.env.PORT;

const app = express();

app.use(clog);

app.use(favicon(__dirname + "/public/favicon.png"));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// TODO apply middleware to use /api
app.use("/api", api);

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`App listening at ${PORT}`));
