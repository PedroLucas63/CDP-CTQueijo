//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import OrderMiddleware from "../middlewares/OrderMiddleware.js";

//* Importação do módulo de controle dos dados dos pedidos:
import OrderController from "../controllers/OrderController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de visualização por chave unica:
router.post("/view", OrderController.view);

//? Rota de visualização de todos os pedidos:
router.get("/viewAll", OrderController.viewAll);

//? Rota de atualizar um pedido:
router.put("/update", OrderMiddleware.update(), OrderController.update);

//? Rota de deletar um pedido:
router.delete("/delete", OrderMiddleware.delete(), OrderController.delete);

//! Exportação das rotas:
export default router;
