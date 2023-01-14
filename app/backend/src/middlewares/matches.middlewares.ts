// 23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

class MatchesMiddlewares {
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

export default MatchesMiddlewares;
