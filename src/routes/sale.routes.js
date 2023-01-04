//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import SaleMiddleware from "../middlewares/SaleMiddleware.js";

//* Importação do módulo de controle dos dados da venda:
import SaleController from "../controllers/SaleController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de criação:
router.post("/create", SaleMiddleware.create(), SaleController.create);

//? Rota de visualização por chave unica:
router.post("/view", SaleController.view);

//? Rota de visualização de todas as vendas:
router.get("/viewAll", SaleController.viewAll);

//? Rota de atualizar uma venda:
router.put("/update", SaleMiddleware.update(), SaleController.update);

//? Rota de deletar uma venda:
router.delete("/delete", SaleMiddleware.delete(), SaleController.delete);

//! Exportação das rotas:
export default router;
