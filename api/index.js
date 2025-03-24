const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let notesData = [
    { note: 12, matiere: "DW" },
    { note: 14, matiere: "Big Data" },
    { note: 16, matiere: "Cybersecurity" },
    { note: 13, matiere: "Cloud Computing" },
    { note: 17, matiere: "Machine Learning" },
    { note: 8, matiere: "Data Mining" }
];

// Get all notes
app.get('/api/notes.json', (req, res) => {
    res.json({ data: notesData });
});

// Add note via query parameters
app.get('/api/add', (req, res) => {
    const { note, matiere } = req.query;

    if (!note || !matiere || isNaN(note)) {
        return res.status(400).json({ error: "Invalid input. Use /api/add?note=NUMBER&matiere=TEXT" });
    }

    const newNote = { note: parseInt(note), matiere };
    notesData.push(newNote);

    res.status(201).json({ message: "Note added successfully!", data: newNote });
});

// Export for Vercel
module.exports = app;
