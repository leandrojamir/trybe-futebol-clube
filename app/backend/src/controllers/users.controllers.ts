// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
import { Request, Response } from 'express';
import createToken from '../utils/jwt.util';
import UsersServices from '../services/users.services';

class UsersController {
  static async postUserController(req: Request, res: Response) {
    const user = req.body;
    // O avaliador verificará se é possível fazer o login com dados corretos e que, após o acesso, será redirecionado para a tela de jogos.
    const check = await UsersServices.postUserServices(user);
    if (!check) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }
    // Se o login foi feito com sucesso, o resultado retornado deverá ser similar ao exibido abaixo, com um status http 200:
    // {
    //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
    // }
    const token = createToken(check);

    return res.status(200).json({ token });
  }
}

export default UsersController;
