const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

async function convertToPDF(transcript) {
  return new Promise((resolve, reject) => {
    const pdfDir = path.join(__dirname, "../PDFS");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

    const doc = new PDFDocument();
    const outputPath = path.join(pdfDir, "myTranscript.pdf");
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);
    doc.font("Times-Roman").fontSize(12).text(transcript, { align: "left" });
    doc.end();

    stream.on("finish", () => {
      console.log(`Transcript saved as ${outputPath}`);
      resolve(outputPath);
    });

    stream.on("error", (err) => reject(err));
  });
}

module.exports = { convertToPDF };