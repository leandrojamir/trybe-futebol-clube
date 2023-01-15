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
// jamir@jamir-X550CA:~/Projetos/back-end/sd-022-b-trybe-futebol-clube$ npm test 05_

// > trybe-futebol-club@1.0.0 pretest
// > (cd ./app/backend && /bin/sh tsc_eval.sh)

// > trybe-futebol-club@1.0.0 test
// > env $(cat ./app/backend/.env) jest -i --forceExit --verbose "05_"

// cat: ./app/backend/.env: Arquivo ou diretório inexistente
//  PASS  __tests__/E2E/05_insertMatches.test.js (210.806 s)
//   23 - Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
//     ✓ Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos (34573 ms)
//   24 - Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados
//     ✓ Será validado que ao finalizar uma partida é alterado no banco de dados e na página (35466 ms)
//   25 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais
//     ✓ Será validado que não é possivel inserir uma partida com times iguais (33226 ms)
//   26 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com time que não existe na tabela teams
//     ✓ Será validado na API que não é possível inserir uma partida com time que não existe na tabela teams (29012 ms)
//   27 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token válido
//     ✓ Será validado na API que não é possível inserir uma partida com um token inválido (40887 ms)

// Test Suites: 1 passed, 1 total
// Tests:       5 passed, 5 total
// Snapshots:   0 total
// Time:        211.857 s
// Ran all test suites matching /05_/i.
// Force exiting Jest: Have you considered using `--detectOpenHandles` to detect async operations that kept running after all tests finished?
