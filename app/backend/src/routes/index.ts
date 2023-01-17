import { Router } from 'express';
import leaderboardsRoutes from './leaderboards.routes';
import matchesRoutes from './matches.routes';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';

const routes = Router();

// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
routes.use('/login', usersRoutes);
// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
routes.use('/teams', teamsRoutes);
// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
routes.use('/matches', matchesRoutes);
// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
routes.use('/leaderboard', leaderboardsRoutes);

export default routes;
