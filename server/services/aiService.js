// const { GoogleGenAI } = require("@google/genai");
// const ai = new GoogleGenAI({});

// // Helper to split text into chunks
// function chunkText(text, maxLength = 2000) { // ~2000 words per chunk
//     const chunks = [];
//     let start = 0;
//     while (start < text.length) {
//         chunks.push(text.slice(start, start + maxLength));
//         start += maxLength;
//     }
//     return chunks;
// }

// // Summarize a single chunk
// async function summarizeChunk(chunk) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "Summarize this:\n" + chunk,
//     });
//     return response.text;
// }

// // Summarize a long transcript
// async function summarizeTranscript(longText) {
//     const chunks = chunkText(longText);
//     const summaries = [];
//     for (const chunk of chunks) {
//         const summary = await summarizeChunk(chunk);
//         summaries.push(summary);
//     }
//     // Optional: summarize the summaries into a final summary
//     const finalSummary = await summarizeChunk(summaries.join("\n"));
//     return finalSummary;
// }

// module.exports = { summarizeTranscript };