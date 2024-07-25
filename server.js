const express = require('express');
const path = require('path');
const fs = require('fs');

const notes = require('./db/db.json');

const PORT = 3001; // Change later for deployment

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Root route
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

// Notes route
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// API routes
app.get('/api/notes', (req, res) => {
    console.info(`GET /api/notes`);
    res.status(200).json(notes);
})


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );