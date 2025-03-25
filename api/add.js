const fs = require('fs');

module.exports = (req, res) => {
  const { note, matiere } = req.query;

  if (!note || !matiere) {
    return res.status(400).send("Missing 'note' or 'matiere' query parameters.");
  }

  const newNote = { note: parseInt(note), matiere };

  fs.readFile('notes.json', 'utf8', (err, data) => {
    if (err) {
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
        return res.status(500).send("Error updating notes file.");
      }
      res.status(201).send(`Note added: ${JSON.stringify(newNote)}`);
    });
  });
};
