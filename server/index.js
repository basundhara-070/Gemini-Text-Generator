require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");

const aiRoutes = require("./routes/aiRoutes");
const notesRoutes = require("./routes/notesRoutes");
const youtubeSearchRoutes = require("./routes/youtubeSearchRoutes");
const transcriptGeneratorRoutes = require("./routes/transcriptGeneratorRoutes");
const summariseRoutes = require("./routes/summariseRoutes");
const createNotesRoutes = require("./routes/createNotesRoutes");

const app = express();
connectDB();

const corsOptions = {
    origin: ["http://localhost:5173", "https://gemini-text-generator-frontend.vercel.app"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));  

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/search", youtubeSearchRoutes);
app.use("/api/transcript", transcriptGeneratorRoutes);
app.use("/api/summarise", summariseRoutes);
app.use("/api/createNotes", createNotesRoutes);

app.get("/", (req, res) => res.send("Hello"));

app.listen(process.env.PORT, () => console.log("Server is running"));