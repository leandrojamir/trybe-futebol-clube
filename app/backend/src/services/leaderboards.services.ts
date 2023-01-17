// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
// O endpoint deverá ser do tipo GET;
// Será avaliado que ao fazer a requisição ao endpoint /leaderboard/home serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;
// Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
import { ITeam, ILeaderboard } from '../interfaces/leaderboards.interfaces';
import { getTeam, goalDifference, tiebreaker, teams, totalGames,
  totalPoints, totalVictoriesDrawsLosses } from '../utils/leaderboard.util';
import { getTeamAway, goalDifferenceAway, teamsAway,
  totalPointsAway, totalVictoriesDrawsLossesAway } from '../utils/leaderboardAway.util';

class LeaderboardsServices {
  static async getHomeLeaderboardServices(): Promise<ILeaderboard[]> {
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

  // 31 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados
  // O endpoint deverá ser do tipo GET;
  // Será avaliado que ao fazer a requisição ao endpoint /leaderboard/away, serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados;
  // Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
  static async getAwayLeaderboardServices(): Promise<ILeaderboard[]> {
    const matches = await getTeamAway();
    const map = matches.map(async (element) => this.statisticsAway(element as ITeam));
    const leaderAway = await Promise.all(map);
    const setName = new Set();
    const classification = leaderAway.filter((element) => {
      const doubleAway = setName.has(element.name);
      setName.add(element.name);

      return !doubleAway;
    });

    return tiebreaker(classification);
  }

  private static async statisticsAway(object: ITeam) {
    const visitor = await teamsAway(object.awayTeam);
    const data = {
      name: object.teamAway.teamName,
      totalPoints: totalPointsAway(visitor),
      totalGames: totalGames(visitor),
      totalVictories: totalVictoriesDrawsLossesAway(visitor, 'totalVictories'),
      totalDraws: totalVictoriesDrawsLossesAway(visitor, 'totalDraws'),
      totalLosses: totalVictoriesDrawsLossesAway(visitor, 'totalLosses'),
      goalsFavor: goalDifferenceAway(visitor, 'goalsFavor'),
      goalsOwn: goalDifferenceAway(visitor, 'goalsOwn'),
      goalsBalance: goalDifferenceAway(visitor),
      efficiency: ((totalPointsAway(visitor) / (totalGames(visitor) * 3)) * 100).toFixed(2),
    };

    return data;
  }

  // 33 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados
  // O endpoint deverá ser do tipo GET;
  // Será avaliado que ao fazer a requisição ao endpoint /leaderboard, serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados.
  // Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
  static async getAllLeaderboardServices() {
    const getHome = await this.getHomeLeaderboardServices();
    const getAway = await this.getAwayLeaderboardServices();
    const classification = getHome.map((element) => {
      const getAll = getAway.find((index) => element.name === index.name);

      return this.statisticsAll(element, getAll as ILeaderboard);
    });

    return tiebreaker(classification);
  }

  private static statisticsAll(hostObject: ILeaderboard, visitorObject: ILeaderboard) {
    const data = {
      name: hostObject.name,
      totalPoints: hostObject.totalPoints + visitorObject.totalPoints,
      totalGames: hostObject.totalGames + visitorObject.totalGames,
      totalVictories: hostObject.totalVictories + visitorObject.totalVictories,
      totalDraws: hostObject.totalDraws + visitorObject.totalDraws,
      totalLosses: hostObject.totalLosses + visitorObject.totalLosses,
      goalsFavor: hostObject.goalsFavor + visitorObject.goalsFavor,
      goalsOwn: hostObject.goalsOwn + visitorObject.goalsOwn,
      goalsBalance: ((hostObject.goalsFavor + visitorObject.goalsFavor)
       - (hostObject.goalsOwn + visitorObject.goalsOwn)),
      efficiency: (((hostObject.totalPoints + visitorObject.totalPoints)
       / ((hostObject.totalGames + visitorObject.totalGames) * 3)) * 100).toFixed(2),
    };

    return data;
  }
}

export default LeaderboardsServices;
