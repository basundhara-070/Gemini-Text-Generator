const express = require("express");
const router = express.Router();
const { generateTranscript } = require("../services/transcriptGenerator");

router.post("/", async (req, res) => {
    const { url } = req.body;
    try {
        const transcript = await generateTranscript(url);
        res.send(transcript);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;