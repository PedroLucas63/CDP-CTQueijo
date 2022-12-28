//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import FlavorMiddleware from "../middlewares/FlavorMiddleware.js";

//* Importação do módulo de controle dos dados do sabor:
import FlavorController from "../controllers/FlavorController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de criação:
router.post("/create", FlavorMiddleware.create(), FlavorController.create);

//? Rota de visualização por chave unica:
router.post("/view", FlavorController.view);

//? Rota de visualização de todos os sabores:
router.get("/viewAll", FlavorController.viewAll);

//? Rota de atualizar um sabor:
router.put("/update", FlavorMiddleware.update(), FlavorController.update);

//? Rota de deletar um sabor:
router.delete("/delete", FlavorMiddleware.delete(), FlavorController.delete);

//! Exportação das rotas:
export default router;
