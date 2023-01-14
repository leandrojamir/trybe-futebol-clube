// 23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

class MatchesMiddlewares {
  // nota de atenção futura: foi necessario criar copia do tokenValidate req12 pois me deparei com seguinte erro ao usar tokenValidate pronto de usersMiddlewares:
  // Expected: "http://localhost:3000/matches"
  // Received: "http://localhost:3000/login"
  // identificado erro replicado no req26, precisei de uma promise pois estava recebendo ainda no /login
  public static tokenValidate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const check = jwt.verify(authorization, process.env.JWT_SECRET as string);
        // 27 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token válido
        // nota de atenção futura 2: req12 não aguardava uma message especifica mas req27 vai pedir { "message": "Token must be a valid token" }
        // Expected: "Token must be a valid token"
        // Received: "Invalid token"
        if (!check) {
          return res.status(401).json({ message: 'Token must be a valid token' });
        }
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

  // 25 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais
  public static matchValidate(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    // Será validado que não é possível inserir uma partida em que o homeTeam e o awayTeam sejam iguais, por exemplo: Barcelona x Barcelona;
    if (homeTeam !== awayTeam) {
      next();
    // Caso isso ocorra, deve-se retornar, com um status 422, a seguinte mensagem::
    // { "message": "It is not possible to create a match with two equal teams" }
    } else {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
  }
}

export default MatchesMiddlewares;
