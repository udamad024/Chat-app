import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { transcribeSpeech, getTranscriptionResult } from './controllers/speech.controller.js';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.post('/api/transcribe', async (req, res) => {
    try {
        const { audioBlob } = req.body;
        const result = await transcribeSpeech(audioBlob);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error transcribing speech:', error);
        res.status(500).json({ error: 'Failed to transcribe speech' });
    }
});

app.get('/api/transcription/:jobName', async (req, res) => {
    try {
        const { jobName } = req.params;
        const transcription = await getTranscriptionResult(jobName);
        res.status(200).json({ transcription });
    } catch (error) {
        console.error('Error getting transcription result:', error);
        res.status(500).json({ error: 'Failed to get transcription result' });
    }
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
