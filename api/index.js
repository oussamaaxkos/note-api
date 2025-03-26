const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let notesData = [
    { note: 12, matiere: "DW" },
    { note: 9, matiere: "Big Data" }
];

let studentData = { firstname: "Osama", lastname: "Akeskous", classe: "M2SI" };

// Get student
app.get('/student.json', (req, res) => {
    res.json({ data: studentData });
});

// Update student via URL query parameters

app.get('/update-student', (req, res) => {
    const { firstname, lastname, classe } = req.query;

    if (!firstname || !lastname || !classe) {
        return res.status(400).json({ error: "Invalid input. Use /update-student?firstname=TEXT&lastname=TEXT&classe=TEXT" });
    }

    // Update student data
    studentData = { firstname, lastname, classe };

    res.status(200).json({ message: "Student data updated successfully!", data: studentData });
});

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

// Delete a note by note number and matiere
app.get('/delete', (req, res) => {
    const { note, matiere } = req.query;

    if (!note || !matiere || isNaN(note)) {
        return res.status(400).json({ error: "Invalid input. Use /delete?note=NUMBER&matiere=TEXT" });
    }

    const initialLength = notesData.length;
    notesData = notesData.filter(n => n.note !== parseInt(note) || n.matiere !== matiere);

    if (notesData.length === initialLength) {
        return res.status(404).json({ error: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
});

// Export for Vercel Serverless Function
module.exports = app;
