const express = require('express');
const bodyParser = require('body-parser')
const { createCompAndInsertPlayer, finishCamp } = require('./midddlewares/handleCompetitions');
const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

app.post('/')

app.post('/competir', createCompAndInsertPlayer);
app.put('/finish', finishCamp)

module.exports = app;
