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
  static async getMatchesControllers(req: Request, res: Response) {
    // 20 - Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end
    // A rota deverá ser do tipo GET e retornar uma lista de partidas filtradas;
    // Será validado que, ao escolher a opção de partidas em andamento, serão filtradas todas as partidas em andamento;
    // Essa requisição deverá usar query string para definir o parâmetro: ex: matches?inProgress=true
    const { inProgress } = req.query;
    if (inProgress) {
      const checkInProgress = await MatchesServices.getQueryMatchesServices(String(inProgress));

      res.status(200).json(checkInProgress);
    } else {
      try {
        const check = await MatchesServices.getMatchesServices();

        res.status(200).json(check);
      } catch (error) {
        res.status(400).json({ error: 'badRequest' });
      }
    }
  }

  // 23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
  static async postMatchesControllers(req: Request, res: Response): Promise<void> {
    const checkInProgress = await MatchesServices.postMatchesServices(req.body);
    // Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com status 201:
    // {
    //   "id": 1,
    //   "homeTeam": 16,
    //   "homeTeamGoals": 2,
    //   "awayTeam": 8,
    //   "awayTeamGoals": 2,
    //   "inProgress": true,
    // }
    res.status(201).json(checkInProgress);
  }
}

export default MatchesControllers;
