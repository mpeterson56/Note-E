const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { stringify } = require("querystring");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class data {
  getNotes = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
          console.log("err", err);
          resolve([]);
        }
        resolve(JSON.parse(data));
      });
    });
  };
  writeNotes = (noteObject) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        "db/db.json",
        JSON.stringify(noteObject),
        function (err, data) {
          if (err) {
            console.log("err", err);
            resolve("could not add note");
          }
          resolve("notes updated");
        }
      );
    });
  };

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv4() };
    this.getNotes().then((result) => {
      const parsedNote = result;
      parsedNote.push(newNote);
      console.log(parsedNote);
      this.writeNotes(parsedNote);
    });
  }


  removeNote(id) {
    this.getNotes().then((notes) => {
      const findNotes = notes.filter((note) => note.id !== id);
      this.writeNotes(findNotes);
    });
  }
};



module.exports = new data();