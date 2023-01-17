import { IMatch } from '../interfaces/matches.interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ILeaderboard } from '../interfaces/leaderboards.interfaces';

// Introdução
// arrow_forward Para construir a classificação dos times, devem ser seguidas as seguintes regras de negócios:
// - `Classificação`: Posição na classificação;
// - `Time`: Nome do time;
// - `P`: Total de Pontos;
// - `J`: Total de Jogos;
// - `V`: Total de Vitórias;
// - `E`: Total de Empates;
// - `D`: Total de Derrotas;
// - `GP`: Gols marcados a favor;
// - `GC`: Gols sofridos;
// - `SG`: Saldo total de gols;
// - `%`: Aproveitamento do time.
// Todas as regras de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações.

// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
const getTeam = async (): Promise<IMatch[]> => {
  const matches = await Match
    .findAll(
      { include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }],
      // Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
      where: { inProgress: false },
      },
    );

  return matches;
};

const teams = async (id: number) => {
  const teamId = await getTeam();

  return teamId.filter((element) => element.homeTeam === id);
};

// Para calcular o Total de Pontos, você deve levar em consideração que:
// O time vitorioso: marcará +3 pontos;
// O time perdedor: marcará 0 pontos;
// Em caso de empate: ambos os times marcam +1 ponto.
const totalPoints = (object: IMatch[]) => {
  const total = object.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) {
      return acc + 3;
    }
    if (curr.homeTeamGoals === curr.awayTeamGoals) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return total;
};

// Para o campo Aproveitamento do time (%), que é a porcentagem de jogos ganhos, use a seguinte fórmula: [P / (J * 3)] * 100, onde:
// P: Total de Pontos;
// J: Total de Jogos.
// Obs.: O seu resultado deverá ser limitado a duas casas decimais.

const totalGames = (object: IMatch[]): number => {
  const total = object.reduce((acc, _curr) => acc + 1, 0);
  return total;
};

const efficiencyTeam = async (id: number) => {
  const teamId = await getTeam();
  const teamHome = teamId.filter((element) => element.homeTeam === id);
  const efficiency = Number((totalPoints(teamHome) / (totalGames(teamHome) * 3)) * 100);

  return efficiency.toFixed(2);
};

// Para calcular Saldo de Gols use a seguinte fórmula: GP - GC, onde:
// GP: Gols marcados a favor;
// GC: Gols sofridos.
const goalDifference = (object: IMatch[], matches = '') => {
  const goalsFavor = object.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  const goalsOwn = object.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  if (matches === 'goalsFavor') {
    return goalsFavor;
  }
  if (matches === 'goalsOwn') {
    return goalsOwn;
  }

  return goalsFavor - goalsOwn;
};

const totalVictoriesDrawsLosses = (object: IMatch[], matches: string) => {
  const result = object.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals && matches === 'totalVictories') {
      return acc + 1;
    }
    if (curr.awayTeamGoals === curr.homeTeamGoals && matches === 'totalDraws') {
      return acc + 1;
    }
    if (curr.awayTeamGoals > curr.homeTeamGoals && matches === 'totalLosses') {
      return acc + 1;
    }

    return acc;
  }, 0);

  return result;
};

// O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:
// Ordem para desempate
// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
const tiebreaker = (balance: ILeaderboard[]) => balance.sort((a, b) =>
  b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);

// Por padrão, as respostas de todos os seus endpoints deverão estar em inglês, mesmo que a renderização no front-end seja em português.
// A sua tabela deverá renderizar somente as PARTIDAS que já foram FINALIZADAS! Os seguintes pontos serão avaliados:
// - Se a lista de classificação está correta;
// - Se a regra de classificação se mantém mesmo com mudanças na classificação;
// - Se a tabela de classificação tem 10 colunas;
// - Se a tabela tem uma linha para cada time.
// Exemplo de retorno esperado:

// [
//   {
//     "name": "Palmeiras",
//     "totalPoints": 13,
//     "totalGames": 5,
//     "totalVictories": 4,
//     "totalDraws": 1,
//     "totalLosses": 0,
//     "goalsFavor": 17,
//     "goalsOwn": 5,
//     "goalsBalance": 12,
//     "efficiency": 86.67
//   },
export {
  getTeam,
  teams,
  totalPoints,
  totalGames,
  efficiencyTeam,
  goalDifference,
  totalVictoriesDrawsLosses,
  tiebreaker,
};
