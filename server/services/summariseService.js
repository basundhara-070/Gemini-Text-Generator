const { GoogleGenAI } = require("@google/genai");
const { convertToPDF } = require("./convertToPDFService");
const fs = require('fs');
const path = require('path');
const { generateTranscript } = require("./transcriptGenerator");
const ai = new GoogleGenAI({});

async function summariseTranscript(url) {
    // Wait for PDF to be created
    const transcript = await generateTranscript(url);
    const pdfPath = await convertToPDF(transcript);

    const contents = [
        { text: "Summarize this document" },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(fs.readFileSync(pdfPath)).toString("base64")
            }
        }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents
    });

    return response.text;
}

module.exports = { summariseTranscript };
