// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
import { Router } from 'express';
import TeamsControllers from '../controllers/teams.controllers';

const teamsRoutes = Router();
// Deve ser uma rota GET com resposta com status 200 e com um json contendo o retorno no seguinte modelo:
teamsRoutes.get('/', TeamsControllers.getTeamsControllers);
// 16 - Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico
teamsRoutes.get('/:id', TeamsControllers.getIdTeamsControllers);

export default teamsRoutes;
