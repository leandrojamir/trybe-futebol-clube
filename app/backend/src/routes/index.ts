import { Router } from 'express';
import usersRoutes from './users.routes';

const routes = Router();

// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
routes.use('/login', usersRoutes);

export default routes;
