const express = require('express');
const app = express();
const fs = require("fs");
const database = require("./db/db")
const path = require('path');
const PORT = process.env.PORT || 3001;
//const apiRoutes = require('./routes/routes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




app.get ("/", function (res,req) {
    res.sendfile(path.join(__dirname, "/public/index.html"));
});



app.get("/notes", function (res, req){
res.sendfile(path.join(__dirname, "/public/notes.html"));


});




app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });