const { GoogleGenAI } = require("@google/genai");
const { convertToPDF } = require("./convertToPDFService");
const fs = require('fs');
const path = require('path');
const ai = new GoogleGenAI({});

async function createNotes(transcript) {
    
    
    await convertToPDF(transcript);
    const pdfPath = path.join(__dirname, "../PDFS/myTranscript.pdf");
    const contents = [
        { text: "Make detailed notes from this data: " },
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

    await convertToPDF(response.text);

    return pdfPath;
}

module.exports = { createNotes };
