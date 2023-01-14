// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
import { Router } from 'express';
import TeamsControllers from '../controllers/teams.controllers';

const teamsRoutes = Router();

teamsRoutes.get('/', TeamsControllers.getTeamsControllers);

export default teamsRoutes;
