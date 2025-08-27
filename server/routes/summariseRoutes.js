const express = require("express");
const router = express.Router();
const { summariseTranscript } = require("../services/summariseService");

router.post("/", async (req, res) => {
    const { url } = req.body;
    try {
        const response = await summariseTranscript(url);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;