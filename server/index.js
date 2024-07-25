const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');


const server = http.createServer(app);
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, '../src/public')));
app.use(cors());


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


app.get('/account/create', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/account/create.html"));
});

app.post('/account/create', (req, res) => {
    console.log('Received data:', req.body);
  
    fs.writeFile(path.join(__dirname, '../src/public/json/users.json'), JSON.stringify(req.body), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save data.' });
      } else {
        res.status(200).json({ message: 'Account created successfully!' });
      }
    });
  });

server.listen(port, () => console.log(`Server running on port ${port}`));