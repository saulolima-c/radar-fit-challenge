const frisby = require('frisby');

const postPlayerMock = {
  competicao: 'competição yoga',
  atleta: 'Joao Marcos',
  value: 10,
  unidade: 'm',
};

const finishCompMock = 'competição hidratação'

const url = 'http://localhost:3001';

describe('1 - Será testada a criação correta de um jogador em algum esporte', () => {
  it('should return a success status by trying to create a player', async () => {
    await frisby
      .post(`${url}/competir`, { body: postPlayerMock })
      .expect('status', 201)
  })

  it('should return a fail status by trying to create a player without name', async () => {
    await frisby
      .post(`${url}/competir`, {
        body: {
          competicao: 'competição yoga',
          value: 10,
          unidade: 'm',
        }
      })
      .expect('status', 400)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        expect(result.message).toBe('O campo "atleta" é obrigatório');
      });
  })

  it('should return a fail status by trying to create a player without value', async () => {
    await frisby
      .post(`${url}/competir`, {
        body: {
          competicao: 'competição yoga',
          atleta: 'Maria José',
          unidade: 'm',
        }
      })
      .expect('status', 400)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        expect(result.message).toBe('O campo "value" é obrigatório');
      });
  })

  it('should return a fail status by trying to create a player without unit', async () => {
    await frisby
      .post(`${url}/competir`, {
        body: {
          competicao: 'competição yoga',
          atleta: 'Maria José',
          value: 10,
        }
      })
      .expect('status', 400)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        expect(result.message).toBe('O campo "unidade" é obrigatório');
      });
  })
})

describe('2 - Será testada se endpoint retonará um array ao requisitar os ranking', () => {
  it('should return a success status by trying to get a yoga ranking', async () => {
    await frisby
      .get(`${url}/rankingYoga`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual([]);
      });
  })

  it('should return a success status by trying to get a water ranking', async () => {
    await frisby
      .get(`${url}/rankingWater`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual([]);
      });
  })

  it('should return 200 by trying to get the dardos ranking', async () => {
    await frisby
      .get(`${url}/rankingDardos`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual([]);
      });
  })

  it('should return a success status and get a weight ranking', async () => {
    await frisby
      .get(`${url}/rankingPeso`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual([]);
      });
  })
})