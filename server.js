// Adding all required modules to run the server
const express = require("express");
const path = require("path");
const api = require("./routes/index");
const uuid = require("./helpers/uuid");
const { clog } = require("./middleware/clog");

// Defining port to run on heroku and locally
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to make the console log more readable
app.use(clog);

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

// GET Route for anything that is not one of the ones listed above and it will route the user back to the home page.
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`App listening at ${PORT}`));
