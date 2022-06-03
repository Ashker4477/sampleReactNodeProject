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

app.use(express.json());


app.get('/movies/data', async (req, res)=>{
    res.status(200).send(movies)
});
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
})


app.listen(PORT,()=>{`Server is listening on Port ${PORT}`})