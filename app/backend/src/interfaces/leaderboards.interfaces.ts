import { IMatch } from './matches.interfaces';
// {
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
export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance:number,
  //     Tipos de propriedade 'efficiency' são incompatíveis.
  //       O tipo 'string' não pode ser atribuído ao tipo 'number'.
  efficiency: string,
}

export interface ITeam extends IMatch {
  inProgress: boolean;
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}
