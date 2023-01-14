// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
// A rota deve ser um GET e retorna uma lista de partidas;
// Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.
// Exemplo de retorno:
// [
//   {
//     "id": 1,
//     "homeTeam": 16,
//     "homeTeamGoals": 1,
//     "awayTeam": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Grêmio"
//     }
//   },
//   ...
//   {
//     "id": 41,
//     "homeTeam": 16,
//     "homeTeamGoals": 2,
//     "awayTeam": 9,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Internacional"
//     }
//   }
// ]
// OBS: Você deverá definir os relacionamentos para teamHome e teamAway somente na model de partidas.
import { Request, Response } from 'express';
import MatchesServices from '../services/matches.services';

class MatchesControllers {
  static async getMatchesControllers(_req: Request, res: Response) {
    try {
      const check = await MatchesServices.getMatchesServices();

      res.status(200).json(check);
    } catch (error) {
      res.status(400).json({ error: 'badRequest' });
    }
  }
}

export default MatchesControllers;
