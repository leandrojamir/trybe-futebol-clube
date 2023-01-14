// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
import { ITeams } from '../interfaces/teams.interfaces';
import teamModel from '../database/models/Team';

class TeamsServices {
  static async getTeamsServices(): Promise<ITeams[]> {
    const teams = await teamModel.findAll();
    console.log(teams);

    return teams;
  }
}

export default TeamsServices;
