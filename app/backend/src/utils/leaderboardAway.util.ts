import { IMatch } from '../interfaces/matches.interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

// 31 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados
const getTeamAway = async (): Promise<IMatch[]> => {
  const matches = await Match
    .findAll(
      { include: [{
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
      // Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
      where: { inProgress: false },
      },
    );

  return matches;
};

const teamsAway = async (id: number) => {
  const teamId = await getTeamAway();

  return teamId.filter((element) => element.awayTeam === id);
};

// Para calcular o Total de Pontos, você deve levar em consideração que:
const totalPointsAway = (object: IMatch[]) => {
  const total = object.reduce((acc, curr) => {
    if (curr.awayTeamGoals > curr.homeTeamGoals) {
      return acc + 3;
    }
    if (curr.awayTeamGoals === curr.homeTeamGoals) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return total;
};

// Para calcular Saldo de Gols use a seguinte fórmula: GP - GC, onde:
const goalDifferenceAway = (object: IMatch[], matches = '') => {
  const goalsFavor = object.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  const goalsOwn = object.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  if (matches === 'goalsFavor') {
    return goalsFavor;
  }
  if (matches === 'goalsOwn') {
    return goalsOwn;
  }

  return goalsFavor - goalsOwn;
};

const totalVictoriesDrawsLossesAway = (object: IMatch[], matches: string) => {
  const result = object.reduce((acc, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals && matches === 'totalVictories') {
      return acc + 1;
    }
    if (curr.awayTeamGoals === curr.homeTeamGoals && matches === 'totalDraws') {
      return acc + 1;
    }
    if (curr.awayTeamGoals < curr.homeTeamGoals && matches === 'totalLosses') {
      return acc + 1;
    }

    return acc;
  }, 0);

  return result;
};

export {
  getTeamAway,
  teamsAway,
  totalPointsAway,
  goalDifferenceAway,
  totalVictoriesDrawsLossesAway,
};
