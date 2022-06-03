const express = require('express');
const app = express();
const fs = require("fs")
const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/db/db.json', apiRoutes);
app.use('/public/index.html', htmlRoutes);
app.use('/public/notes.html', notesHTMLroutes);

require('./routes/routes')(app);


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });