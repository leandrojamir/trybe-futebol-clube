// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
import { ITeams } from '../interfaces/teams.interfaces';
import teamModel from '../database/models/Team';

class TeamsServices {
  static async getTeamsServices(): Promise<ITeams[]> {
    const teams = await teamModel.findAll();

    return teams;
  }

  // 16 - Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico
  static async getIdTeamsServices(id: number): Promise<ITeams | object> {
    const [teams] = await teamModel.findAll({ where: { id } });
    if (!teams) {
      return {
        status: 401,
        message: { message: 'Not found' },
      };
    }

    return teams;
  }
}

export default TeamsServices;
