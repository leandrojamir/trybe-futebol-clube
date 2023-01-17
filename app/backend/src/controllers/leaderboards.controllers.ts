// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
import { Request, Response } from 'express';
import LeaderboardsServices from '../services/leaderboards.services';

class LeaderboardsControllers {
  static async getHomeLeaderboardsControllers(_req: Request, res: Response): Promise<void> {
    const result = (await LeaderboardsServices.getHomeLeaderboardServices());
    res.status(200).json(result);
  }

  // 31 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados
  static async getAwayLeaderboardsControllers(_req: Request, res: Response): Promise<void> {
    const result = (await LeaderboardsServices.getAwayLeaderboardServices());
    res.status(200).json(result);
  }
}

export default LeaderboardsControllers;
