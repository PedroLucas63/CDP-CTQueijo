//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import ProductMiddleware from "../middlewares/ProductMiddleware.js";

//* Importação do módulo de controle dos dados do produto:
import ProductController from "../controllers/ProductController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de criação:
router.post("/create", ProductMiddleware.create(), ProductController.create);

//? Rota de visualização por chave unica:
router.post("/view", ProductController.view);

//? Rota de visualização de todos os produtos:
router.get("/viewAll", ProductController.viewAll);

//? Rota de atualizar um produto:
router.put("/update", ProductMiddleware.update(), ProductController.update);

//? Rota de deletar um produto:
router.delete("/delete", ProductMiddleware.delete(), ProductController.delete);

//! Exportação das rotas:
export default router;
