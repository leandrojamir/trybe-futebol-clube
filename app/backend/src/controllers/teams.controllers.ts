// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
import { Request, Response } from 'express';
import TeamsServices from '../services/teams.services';

class TeamsControllers {
  static async getTeamsControllers(_req: Request, res: Response): Promise<void> {
    try {
      const check = await TeamsServices.getTeamsServices();
      // Deve ser uma rota GET com resposta com status 200 e com um json contendo o retorno no seguinte modelo:
      //   [
      //     {
      //       "id": 1,
      //       "teamName": "Avaí/Kindermann"
      //     },
      //     {
      //       "id": 2,
      //       "teamName": "Bahia"
      //     },
      //     {
      //       "id": 3,
      //       "teamName": "Botafogo"
      //     },
      //     ...
      //   ]
      console.log(check);
      res.status(200).json(check);
    } catch (error) {
      res.status(400).json({ error: 'badRequest' });
    }
  }
}

export default TeamsControllers;
