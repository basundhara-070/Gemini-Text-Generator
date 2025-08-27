const express = require("express");
const router = express.Router();
const { generateContent } = require("../services/aiService");

router.post("/", async (req, res) => {
    const { prompt } = req.body;
    try {
        const text = await convertToPDF(prompt);
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;