// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
import { Router } from 'express';
import MatchesControllers from '../controllers/matches.controllers';

const matchesRoutes = Router();
// A rota deve ser um GET e retorna uma lista de partidas;
matchesRoutes.get('/', MatchesControllers.getMatchesControllers);

export default matchesRoutes;
