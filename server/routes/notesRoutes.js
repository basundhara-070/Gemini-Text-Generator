const express = require("express");
const router = express.Router();
const { saveNote, getNotes } = require("../services/notesService");

router.post("/", async (req, res) => {
    const { prompt, response } = req.body;
    try {
        const savedNote = await saveNote(prompt, response);
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const notes = await getNotes();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
