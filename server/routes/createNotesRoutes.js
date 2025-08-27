const express = require("express");
const router = express.Router();
const { createNotes } = require("../services/createNotesService");

router.post("/", async (req, res) => {
    const { transcript } = req.body;
    try {
        const text = await createNotes(transcript);
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;