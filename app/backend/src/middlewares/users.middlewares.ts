// 5 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end
import { NextFunction, Request, Response } from 'express';

export default class UsersMiddlewares {
  public static usersValidate(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    // O avaliador verificará se fazer o login sem um email, haverá o retorno de status bad request.
    if (email) {
      return next();
    }

    // Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http 400:
    //   { "message": "All fields must be filled" }
    return res.status(400).json({ message: 'All fields must be filled' });
  }
}
