const notes = require("express").Router();

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

const uuid = require("../helpers/uuid");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for a specific tip
notes.delete("/:id", (req, res) => {
  console.log(req.params);
  const noteId = req.params.id;
  readFromFile("./db/notes.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      console.log(json);
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/notes.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/notes.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error in adding tip");
  }
});

module.exports = notes;
