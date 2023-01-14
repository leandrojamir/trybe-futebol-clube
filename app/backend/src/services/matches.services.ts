// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
// Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.
// OBS: Você deverá definir os relacionamentos para teamHome e teamAway somente na model de partidas.
import matchModel from '../database/models/Match';
import Team from '../database/models/Team';

class MatchesServices {
  static async getMatchesServices() {
    const matches = await matchModel.findAll({
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
    });

    return matches;
  }
}

export default MatchesServices;
