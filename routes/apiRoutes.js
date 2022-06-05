const router = require("express").Router();
const data = require("../db/data");

router.get('/notes', (req,res) => {
    data.getNotes()
    .then(notes => {
        res.json(notes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});



router.post('/notes', (req, res) =>{
console.log(req.body)
const note = data.addNote(req.body)
res.json(note)
})




router.delete('/notes/:id', (req, res) => {
    data
        .removeNote(req.params.id)
       .then ( (notes) => res.json(notes))
        .catch(err => res.status(500).json(err))
})

module.exports= router;