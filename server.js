const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let bubblesScores = [
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}
];
let fizzScores = [
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}
];
let impactScores = [
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}, 
  {name:'', score: 0}
];
let id = 0;

app.get('/api/scores/:gameType', (req, res) => {
  let gameType = req.params.gameType;
  let scores = bubblesScores;
  if (gameType == "fizz") {
    scores = fizzScores;
  } else if (gameType == "impact") {
    scores = impactScores;
  }
  res.send(scores);
});

app.post('/api/scores/:gameType', (req, res) => {
  let item = {name:req.body.name, score: req.body.score};
  let gameType = req.params.gameType;
  let scores = bubblesScores;
  if (gameType == "fizz") {
    scores = fizzScores;
  } else if (gameType == "impact") {
    scores = impactScores;
  } 
  if (scores.length != 0) {
    scores.pop();
  }
  scores.push(item);
  scores.sort(function(scoreItem1, scoreItem2){return scoreItem2.score-scoreItem1.score});
  res.send(item);
});

app.listen(3001, () => console.log('Server listening on port 3001!'))