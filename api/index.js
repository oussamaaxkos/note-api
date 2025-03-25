const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

// GET route to serve notes.json
app.get('/notes.json', (req, res) => {
    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading notes.json:", err);
            return res.status(500).send("Error reading notes file.");
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// GET route to add a new note via query params
app.get('/add', (req, res) => {
    const { note, matiere } = req.query;

    if (!note || !matiere) {
        return res.status(400).send("Missing 'note' or 'matiere' query parameters.");
    }

    const newNote = { note: parseInt(note), matiere };

    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading notes.json:", err);
            return res.status(500).send("Error reading notes file.");
        }

        let notesData;
        try {
            notesData = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send("Error parsing notes data.");
        }

        notesData.data.push(newNote);

        fs.writeFile('notes.json', JSON.stringify(notesData, null, 2), (err) => {
            if (err) {
                console.error("Error writing to notes.json:", err);
                return res.status(500).send("Error updating notes file.");
            }
            res.status(201).send(`Note added: ${JSON.stringify(newNote)}`);
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
