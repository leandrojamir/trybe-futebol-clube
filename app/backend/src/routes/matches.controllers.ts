// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
import { Request, Response } from 'express';
import MatchesServices from '../services/matches.services';

class MatchesControllers {
  static async getMatchesControllers(_req: Request, res: Response) {
    try {
      const check = await MatchesServices.getMatchesServices();

      res.status(200).json(check);
    } catch (error) {
      res.status(400).json({ error: 'badRequest' });
    }
  }
}

export default MatchesControllers;
