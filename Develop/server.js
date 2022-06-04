const express = require('express');
const app = express();
const fs = require("fs");
const database = require("./db/db")
const path = require('path');
const PORT = process.env.PORT || 3001;
const router = require('express').Router();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);





app.get ("*", function (res,req) {
    res.sendfile(path.join(__dirname, "/public/index"));
});
app.get("/api/notes", function (res, req){
res.sendfile(path.join(__dirname, "/public/notes"));

});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

