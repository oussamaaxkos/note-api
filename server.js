const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json()); // For parsing application/json

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

// GET route to serve notes.json
app.get('/notes.json', (req, res) => {
    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading notes.json:", err);
            res.status(500).send("Error reading notes file.");
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// POST route to add a new note
app.post('/notes', (req, res) => {
    const newNote = req.body; // Get note data from request body

    // Read existing notes
    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading notes.json:", err);
            res.status(500).send("Error reading notes file.");
            return;
        }

        const notesData = JSON.parse(data);
        notesData.data.push(newNote); // Add the new note

        // Write updated data back to notes.json
        fs.writeFile('notes.json', JSON.stringify(notesData, null, 2), (err) => {
            if (err) {
                console.error("Error writing to notes.json:", err);
                res.status(500).send("Error updating notes file.");
                return;
            }
            res.status(201).send("Note added successfully!");
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
