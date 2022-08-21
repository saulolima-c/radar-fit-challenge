const express = require('express');
const bodyParser = require('body-parser')
const {
    createCompAndInsertPlayer, finishCamp,
    orderYogaPlayers, orderWaterPlayers,
    orderDardoPlayers, orderWeightPlayers } = require('./midddlewares/handleCompetitions');
const {
    playerValidateName,
    playerValidateValue,
    playerValidateUnit,
} = require('./midddlewares/competitionValidation');
const app = express();

app.use(bodyParser.json())

app.get('/', (_req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

app.post('/')

app.post('/competir', playerValidateName, playerValidateValue, playerValidateUnit, createCompAndInsertPlayer);
app.put('/finish', finishCamp)

app.get('/rankingYoga', orderYogaPlayers)
app.get('/rankingWater', orderWaterPlayers)
app.get('/rankingDardos', orderDardoPlayers)
app.get('/rankingPeso', orderWeightPlayers)

module.exports = app;
