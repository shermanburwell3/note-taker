const express = require('express');
const path = require('path');
const fs = require('fs');

const notes = require('./db/db.json');

const PORT = 3001; // Change later for deployment

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Root route
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/index.html'))
  );

// Notes route
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
  );

// API routes
app.get('/api/notes', (req, res) => {
    console.info(`GET /api/notes`);
    res.status(200).json(notes);
});

app.post('/api/reviews', (req, res) => {

  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
    

    // Convert data to string so we can save it in json format

    notes.push(newNote);
    const noteString = JSON.stringify(notes);

    // Write string to a file
    fs.writeFile('./db/db.json', noteString, (err) => {
      err ? console.log(err)
      : console.log(`Note has been submitted: ${newNote}`)
    });

    const response = {
      status: 'success',
      body: newNote,
    };
    
    console.log(resonse);
    res.status(201).json(response);
  }
  else {
    res.status(500).json('Error in posting note');
  }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );