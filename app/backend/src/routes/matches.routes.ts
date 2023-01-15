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
matchesRoutes.post(
  '/',
  // A partida só pode ser criada com token JWT validado;
  MatchesMiddlewares.tokenValidate,
  // 25 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais
  MatchesMiddlewares.matchValidate,
  MatchesControllers.postMatchesControllers,
);

// 24 - Desenvolva o endpoint /matches/:id/finish de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados
// A rota deve ser do tipo PATCH;
matchesRoutes.patch('/:id/finish', MatchesControllers.patchMatchesControllers);

// 28 - Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento
// O endpoint deve ser do tipo PATCH;
matchesRoutes.patch('/:id', MatchesControllers.updateMatchesControllers);

export default matchesRoutes;
// The self-hosted runner: self-hosted-runner-vdxk2-7mbzf lost communication with the server
