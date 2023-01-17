// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
// O endpoint deverá ser do tipo GET;
// Será avaliado que ao fazer a requisição ao endpoint /leaderboard/home serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;
// Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
import { ITeam, ILeaderboard } from '../interfaces/leaderboards.interfaces';
import { getTeam, goalDifference, tiebreaker, teams, totalGames,
  totalPoints, totalVictoriesDrawsLosses } from '../utils/leaderboard.util';

class LeaderboardsServices {
  static async getLeaderboardServices(): Promise<ILeaderboard[]> {
    const matches = await getTeam();
    const map = matches.map(async (element) => this.statistics(element as ITeam));
    const leader = await Promise.all(map);
    const setName = new Set();
    const classification = leader.filter((element) => {
      const double = setName.has(element.name);
      setName.add(element.name);

      return !double;
    });

    return tiebreaker(classification);
  }

  private static async statistics(object: ITeam) {
    const host = await teams(object.homeTeam);
    const data = {
      name: object.teamHome.teamName,
      totalPoints: totalPoints(host),
      totalGames: totalGames(host),
      totalVictories: totalVictoriesDrawsLosses(host, 'totalVictories'),
      totalDraws: totalVictoriesDrawsLosses(host, 'totalDraws'),
      totalLosses: totalVictoriesDrawsLosses(host, 'totalLosses'),
      goalsFavor: goalDifference(host, 'goalsFavor'),
      goalsOwn: goalDifference(host, 'goalsOwn'),
      goalsBalance: goalDifference(host),
      efficiency: ((totalPoints(host) / (totalGames(host) * 3)) * 100).toFixed(2),
    };

    return data;
  }
}

export default LeaderboardsServices;
