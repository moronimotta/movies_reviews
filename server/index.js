const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const server = http.createServer(app);
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.static(path.join(__dirname, '../src/public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});


app.get("/movies/details?:movie_id", (req, res) => {
    const movieId = req.params.movie_id;
    console.log(movieId);
    res.sendFile(path.join(__dirname, "../src/movies/details.html"));
});

app.get("/movies/list", (req, res) => {

    res.sendFile(path.join(__dirname, "../src/movies/lists.html"));
});

app.post('/movies/list/add', (req, res) => {
    const data = req.body

    fs.writeFile("../public/json/lists.json", JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    }
    );
});


server.listen(port, () => console.log(`Server running on port ${port}`));