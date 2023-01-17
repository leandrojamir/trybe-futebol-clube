// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
// O endpoint deverá ser do tipo GET;
// Será avaliado que ao fazer a requisição ao endpoint /leaderboard/home serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;
// Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.
import { Request, Response } from 'express';
import LeaderboardsServices from '../services/leaderboards.services';

class LeaderboardsControllers {
  // Expected: "http://localhost:3000/matches"
  // Received: "http://localhost:3000/login"
  // static async login(req: Request, res: Response): {
  static async getLeaderboardsControllers(_req: Request, res: Response): Promise<void> {
    const result = (await LeaderboardsServices.getLeaderboardServices());
    res.status(200).json(result);
  }
}

export default LeaderboardsControllers;
