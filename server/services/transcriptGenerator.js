const { execFile } = require('child_process');
const path = require('path');

async function generateTranscript(url) {
   // return url;
    return new Promise((resolve, reject) => {
        // Extract video ID from URL
        //url;
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (!match) return reject("Invalid YouTube URL");
        const videoId = match[1];

        const scriptPath = path.join(__dirname, 'transcript.py');

        execFile('python', [scriptPath, videoId], (error, stdout, stderr) => {
            if (error) return reject(error);
            try {
                const result = JSON.parse(stdout);
                if (result.error) return reject(result.error);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    });
}

module.exports = { generateTranscript };
