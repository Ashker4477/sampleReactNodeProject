const express = require('express');
const movies = require('./data');
const cors = require('cors');
const path = require('path');

const PORT = 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.json());

app.get('/movies/data', (req, res)=>{
    return res.send(movies)
});

app.post('/movies/data', (req, res)=>{
  if (!req.body.name || !req.body.released){
    return res.status(400).json({'error' : "Invalid Data"})
  }
  else{
    let movie = {
      id : movies.length + 1,
      name : req.body.name,
      released : req.body.released,
    }
    movies.push(movie);
    return res.send(movie);
  }
})

app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
})

app.listen(PORT,()=>{`Server is listening on Port ${PORT}`})