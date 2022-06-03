const express = require('express');
const app = express();
const fs = require("fs");
const database = require("./db/db")
const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




app.get ("/", function (res,req) {
    res.sendfile(path.join(__dirname, "/public/index.html"));
});



app.get("/notes", function (res, req){
res.sendfile(path.join(__dirname, "/public/notes.html"));


});



app.route("/api/notes").get(function (req,res){
    res.json(database)
})

.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;
    let highestId = 99;
    for (let i = 0; i < database.length; i++) {
        let individualNote = database[i];
        if (individualNote.id > highestId) {           
            highestId = individualNote.id;
        }
    }
    newNote.id = highestId + 1;
    database.push(newNote)
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Your note was saved!");
    });
   
    res.json(newNote);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });