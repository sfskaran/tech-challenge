const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// In-memory data structure to store notes
let notes = [];
let noteId = 1; // Auto-incrementing ID for notes

// @route    POST api/notes
// @desc     Create a new note
// @access   Public
router.post(
  "/",
  check("text", "Text is required").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newNote = {
      id: noteId++,
      text: req.body.text,
      createdAt: new Date(),
    };

    notes.push(newNote);
    res.json(newNote);
  }
);

// @route    GET api/notes
// @desc     Get all notes
// @access   Public
router.get("/", (req, res) => {
  res.json(notes);
});

// @route    GET api/notes/:id
// @desc     Get a note by ID
// @access   Public
router.get("/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return res.status(404).json({ msg: "Note not found" });
  }

  res.json(note);
});

// @route    PUT api/notes/:id
// @desc     Update a note
// @access   Public
router.put(
  "/:id",
  check("text", "Text is required").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = notes.find((n) => n.id === parseInt(req.params.id));

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    note.text = req.body.text;
    res.json(note);
  }
);

// @route    DELETE api/notes/:id
// @desc     Delete a note
// @access   Public
router.delete("/:id", (req, res) => {
  const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return res.status(404).json({ msg: "Note not found" });
  }

  notes.splice(noteIndex, 1);
  res.json({ msg: "Note deleted successfully" });
});

module.exports = router;
