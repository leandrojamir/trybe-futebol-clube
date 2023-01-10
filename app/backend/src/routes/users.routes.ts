// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
import { Router } from 'express';
import UsersController from '../controllers/users.controllers';

const usersRoutes = Router();
// A rota de ser do tipo POST;
usersRoutes.post('/', UsersController.postUserController);

export default usersRoutes;
