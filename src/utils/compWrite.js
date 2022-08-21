const fs = require('fs').promises;

const getCompetition = async () => {
    const results = await fs.readFile('./results.json', 'utf-8')
    .then((res) => JSON.parse(res));
    return results;
};

const writeCompetition = async (competition) => {
    const wr = await fs.writeFile('./results.json', JSON.stringify(competition));
    return wr;
};

module.exports = { getCompetition, writeCompetition };