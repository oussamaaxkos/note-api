const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let notesData = [
    { note: 12, matiere: "DW" },
    { note: 14, matiere: "Big Data" },
    { note: 16, matiere: "Cybersecurity" },
    { note: 13, matiere: "Cloud Computing" },
    { note: 17, matiere: "Machine Learning" },
    { note: 8, matiere: "Data Mining" }
];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

// GET route to fetch notes
app.get('/notes', (req, res) => {
    res.json({ data: notesData });
});

// POST route to add a new note
app.post('/notes', (req, res) => {
    const newNote = req.body;

    if (!newNote || typeof newNote.note !== 'number' || !newNote.matiere) {
        return res.status(400).json({ error: "Invalid data format. Expected { note: number, matiere: string }" });
    }

    notesData.push(newNote);
    res.status(201).json({ message: "Note added successfully!", data: newNote });
});

// Export for Vercel
module.exports = app;
