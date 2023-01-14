import { Router } from 'express';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';

const routes = Router();

// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
routes.use('/login', usersRoutes);
// 15 - Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente
routes.use('/teams', teamsRoutes);

export default routes;
