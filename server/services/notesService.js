const Notes = require("../models/NotesModel");

async function saveNote(prompt, response) {
    const newNote = new Notes({ prompt, response });
    return await newNote.save();
}

async function getNotes() {
    return await Notes.find();
}

module.exports = { saveNote, getNotes };
