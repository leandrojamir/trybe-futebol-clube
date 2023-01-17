// 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados
import { Router } from 'express';
import LeaderboardsControllers from '../controllers/leaderboards.controllers';

const leaderboardsRoutes = Router();
// O endpoint deverá ser do tipo GET;
leaderboardsRoutes.get('/home', LeaderboardsControllers.getHomeLeaderboardsControllers);
// 31 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados
leaderboardsRoutes.get('/away', LeaderboardsControllers.getAwayLeaderboardsControllers);

export default leaderboardsRoutes;
