const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

// API endpoint to serve notes.json
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
