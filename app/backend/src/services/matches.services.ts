// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
// Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.
// OBS: Você deverá definir os relacionamentos para teamHome e teamAway somente na model de partidas.
import { IMatch } from '../interfaces/matches.interfaces';
import matchModel from '../database/models/Match';
import Team from '../database/models/Team';

class MatchesServices {
  static async getMatchesServices() {
    const matches = await matchModel.findAll({
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
    });

    return matches;
  }

  // 20 - Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end
  // Essa requisição deverá usar query string para definir o parâmetro: ex: matches?inProgress=true
  // Exemplo de retorno da requisição:
  // [
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
  //   },
  //   {
  //     "id": 42,
  //     "homeTeam": 6,
  //     "homeTeamGoals": 1,
  //     "awayTeam": 1,
  //     "awayTeamGoals": 0,
  //     "inProgress": true,
  //     "teamHome": {
  //       "teamName": "Ferroviária"
  //     },
  //     "teamAway": {
  //       "teamName": "Avaí/Kindermann"
  //     }
  //   }
  // ]
  static getQueryMatchesServices = async (query: string): Promise<any> => {
    if (query === 'true') {
      const inProgressTrue = await matchModel.findAll({
        where: { inProgress: true },
        include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' },
        ],
      });

      return inProgressTrue;
    }

    // 21 - Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end
    // A rota deverá ser do tipo GET e retornar uma lista de partidas filtradas;
    // Será validado que,ao escolher a opção de partidas finalizadas, serão filtradas todas as partidas finalizadas;
    // Essa requisição deverá usar query string para definir o parâmetro. ex: matches?inProgress=false
    const inProgressFalse = await matchModel.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' },
      ],
    });

    return inProgressFalse;
  };

  // 23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
  // A rota deverá ser do tipo POST e retornar a partida inserida no banco de dados;
  // Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos;
  // O corpo da requisição terá o seguinte formato:
  // {
  //   "homeTeam": 16, // O valor deve ser o id do time
  //   "awayTeam": 8, // O valor deve ser o id do time
  //   "homeTeamGoals": 2,
  //   "awayTeamGoals": 2,
  // }
  static async postMatchesServices(match: IMatch) {
    const inProgress = await matchModel.create({
      ...match, inProgress: true,
    });

    return inProgress;
  }

  // 24 - Desenvolva o endpoint /matches/:id/finish de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados
  // Será validado que, ao finalizar uma partida, a alteração é feita no banco de dados e na página.
  // Será recebido o id pelo parâmetro da URL;
  static async patchMatchesServices(id:number) {
    const updateMatches = await matchModel.update({
      inProgress: false }, { where: { id } });

    return {
      type: null,
      message: updateMatches,
    };
  }
}

export default MatchesServices;
