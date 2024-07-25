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
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));



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
  const body = req.body
 
    fs.writeFile("../src/public/json/lists.json", JSON.stringify(body), (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ message: "Movie added successfully" });
    }
    );
  }
);
app.post('/movies/list/create', (req, res) => {
  const body = req.body
 
    fs.writeFile("../src/public/json/lists.json", JSON.stringify(body), (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ message: "Movie added successfully" });
    }
    );
  }
);


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


app.post('/reviews/add', (req, res) => {
  fs.writeFile(path.join(__dirname, '../src/public/json/reviews.json'), JSON.stringify(req.body), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to save data.' });
    } else {
      res.status(200).json({ message: 'Review added successfully!' });
    }
  });
});


app.get('/user/account', (req, res) => {
  res.sendFile(path.join(__dirname, "../src/user/index.html"));
}
);



app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../src/account/login.html"));
}
);

app.get('/movies/popular', (req, res) => {
  res.sendFile(path.join(__dirname, "../src/movies/popular.html"));
}
);

app.post('/login', (req, res) => {
  const { email, password } = req.body

  fs.readFile(path.join(__dirname, '../src/public/json/users.json'), 'utf8', (err, data) => {

    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to read data.' });
    }

    const users = JSON.parse(data);
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      res.status(200).json({ message: 'Login successful!', user });
    }
    else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  }
  );
}
);


// Get function to get data:
app.get('/data/reviews', (req, res) => {
  fs.readFile(path.join(__dirname, '../src/public/json/reviews.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to read data.' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
}
);

app.get('/data/users', (req, res) => {
  fs.readFile(path.join(__dirname, '../src/public/json/users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to read data.' });
    } else {
      console.log(data);
      res.status(200).json(JSON.parse(data));
    }
  });
});


app.get('/data/lists', (req, res) => {
  fs.readFile(path.join(__dirname, '../src/public/json/lists.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to read data.' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
}
);


server.listen(port, () => console.log(`Server running on port ${port}`));