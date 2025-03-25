const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let notesData = [
    { note: 12, matiere: "DW" },
    { note: 14, matiere: "Big Data" },

];

// Get all notes
app.get('/notes.json', (req, res) => {
    res.json({ data: notesData });
});

// Add a note via URL query parameters
app.get('/add', (req, res) => {
    const { note, matiere } = req.query;

    if (!note || !matiere || isNaN(note)) {
        return res.status(400).json({ error: "Invalid input. Use /add?note=NUMBER&matiere=TEXT" });
    }

    const newNote = { note: parseInt(note), matiere };
    notesData.push(newNote);

    res.status(201).json({ message: "Note added successfully!", data: newNote });
});

// Export for Vercel Serverless Function
module.exports = app;
