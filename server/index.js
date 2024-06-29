require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const corsOptions = {
    origin : ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async(req,res)=>{
    const {prompt} = req.body;
    try{
        const model = genAI.getGenerativeModel({model:"gemini-pro"})

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text =  response.text();
        res.send(text);
    } catch(error){
        console.log(error);
        req.status(500).send("Failed to generate content");
    }
});

app.listen(process.env.PORT, console.log("Server is Running"));


