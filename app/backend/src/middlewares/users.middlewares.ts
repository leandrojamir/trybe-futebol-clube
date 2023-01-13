// 5 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

class UsersMiddlewares {
  public static usersValidate(req: Request, res: Response, next: NextFunction) {
    // 7 - Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end
    const { email, password } = req.body;
    // O avaliador verificará se fazer o login sem um email, haverá o retorno de status bad request.
    // O avaliador verificará se fazer login sem senha, o retorno será status bad request.
    if (email && password) {
      return next();
    }

    // Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http 400:
    //   { "message": "All fields must be filled" }
    // Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http 400:
    //   { "message": "All fields must be filled" }
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  // 12 - Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end
  // Deve ser uma rota GET que receba um header com parâmetro authorization, onde ficará armazenado o token gerado no login;
  // O avaliador verificará se ao tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário.
  public static tokenValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const check = jwt.verify(authorization, process.env.JWT_SECRET as string);
        if (!check) {
          return res.status(401).json({ message: 'Invalid token' });
        }
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

export default UsersMiddlewares;
