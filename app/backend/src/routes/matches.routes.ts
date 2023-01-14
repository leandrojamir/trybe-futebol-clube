// 19 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end.
import { Router } from 'express';
// import UsersMiddlewares from '../middlewares/users.middlewares';
import MatchesControllers from '../controllers/matches.controllers';
import MatchesMiddlewares from '../middlewares/matches.middlewares';

const matchesRoutes = Router();
// A rota deve ser um GET e retorna uma lista de partidas;
matchesRoutes.get('/', MatchesControllers.getMatchesControllers);

// 23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
// A rota deverá ser do tipo POST e retornar a partida inserida no banco de dados;
// A partida só pode ser criada com token JWT validado;

// nota de atenção futura: foi necessario criar copia do tokenValidate pois me deparei com seguinte erro ao usar tokenValidate pronto de usersMiddlewares:
// Expected: "http://localhost:3000/matches"
// Received: "http://localhost:3000/login"
matchesRoutes.post(
  '/',
  MatchesMiddlewares.tokenValidate,
  MatchesControllers.postMatchesControllers,
);

// nota de atenção futura 2: req12 não aguardava uma message especifica mas req27 vai pedir { "message": "Token must be a valid token" }
// Expected: "Token must be a valid token"
// Received: "Invalid token"
export default matchesRoutes;
