// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
import { Router } from 'express';
import UsersController from '../controllers/users.controllers';
// 5 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end
import UsersMiddlewares from '../middlewares/users.middlewares';

const usersRoutes = Router();
// A rota de ser do tipo POST;
// 7 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end
usersRoutes.post('/', UsersMiddlewares.usersValidate, UsersController.postUserController);

export default usersRoutes;
