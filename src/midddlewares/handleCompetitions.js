/* const { writeCompetition, getCompetition } = require('../utils/compWrite'); */
const { v4: uuid } = require('uuid')

const yogaCamp = {
    'compName': 'competição yoga',
    'status': 'running',
    players: [],
}
const waterCamp = {
    'compName': 'competição hidratação',
    'status': 'running',
    players: [],
}
const dardoCamp = {
    'compName': 'competição dardos',
    'status': 'running',
    players: [],
}
const weightCamp = {
    'compName': 'competição peso',
    'status': 'running',
    players: [],
}

const createCompAndInsertPlayer = (req, res) => {
    const { competicao, atleta, value, unidade } = req.body;

    const result = {
        id: uuid(),
        atleta,
        value,
        unidade
    }

    if (competicao === 'competição yoga' && yogaCamp.status !== 'finished') {
        yogaCamp.players.push(result)
    } else if (competicao === 'competição hidratação' && waterCamp.status !== 'finished') {
        waterCamp.players.push(result)
    } else if (competicao === 'competição dardos' && yogaCamp.status !== 'finished') {
        dardoCamp.players.push(result)
    } else if (weightCamp.status !== 'finished') {
        weightCamp.players.push(result)
    }

    return res.status(201).json(result)
}

const finishCamp = async (req, res) => {
    const { competicao } = req.body;

    if (competicao === 'competição yoga') yogaCamp.status = 'finished';
    if (competicao === 'competição hidratação') waterCamp.status = 'finished';
    if (competicao === 'competição dardos') dardoCamp.status = 'finished';
    if (competicao === 'competição peso') weightCamp.status = 'finished';

    return res.status(200).json(`${competicao} finalizada`)
}

const orderYogaPlayers = async (_req, res) => {
    const values = [];
    for (var i = 0; i < yogaCamp.players.lenght; i++) {
        const { unidade } = yogaCamp.players[i];

        // coloca todas as unidades em segundos
        if (unidade !== 's') {
            yogaCamp.players[i].value *= 60
        }
        values.push(yogaCamp.players[i].value)
    }
    const ranking = values.sort();
    return res.status(200).json(ranking.reverse());
}

const orderWaterPlayers = (_req, res) => {
    const values = [];
    for (var i = 0; i < waterCamp.players.lenght; i++) {
        const { unidade } = waterCamp.players[i];

        // coloca todas as unidades em ml
        if (unidade !== 'ml') {
            waterCamp.players[i].value *= 1000
        }
        values.push(waterCamp.players[i].value)
    }
    const ranking = values.sort();
    return res.status(200).json(ranking.reverse());
}

const orderWeightPlayers = (_req, res) => {
    const values = [];
    for (var i = 0; i < weightCamp.players.lenght; i++) {
        const { unidade } = weightCamp.players[i];

        // coloca todas as unidades em g
        if (unidade !== 'g') {
            weightCamp.players[i].value *= 1000
        }
        values.push(weightCamp.players[i].value)
    }
    const ranking = values.sort();
    return res.status(200).json(ranking.reverse());
}

const orderDardoPlayers = (_req, res) => {
    const values = [];
    for (var i = 0; i < dardoCamp.players.lenght; i++) {
        const { unidade } = dardoCamp.players[i];

        // coloca todas as unidades em m
        if (unidade !== 'm') {
            dardoCamp.players[i].value *= 1000 // (caso seja dado em km)
        }

        // seleciona apenas a maior distância
        const maxDistance = dardoCamp.players[i].values.reduce(function(prev, current) { 
            return prev > current ? prev : current; 
        });
        values.push(maxDistance)
    }
    const ranking = values.sort();
    return res.status(200).json(ranking.reverse());
}

module.exports = {
    createCompAndInsertPlayer,
    finishCamp,
    orderYogaPlayers,
    orderWaterPlayers,
    orderWeightPlayers,
    orderDardoPlayers,
}