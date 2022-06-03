const fs = require("fs");
const path = require('path');

const router = require('express').Router();

const {
    filterByQuery,
    findById,
    createNewNote,
    validateNotes
  } = require('../db/db');
  const { notes} = require('../db/db');
  
  router.get('../db/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });


router.get('/db', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  router.post('/db', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
    if (!validateNotes(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const notes = createNewNote(req.body, notes);
      res.json(notes);
    }
  });
  
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
  });




  module.exports = router;