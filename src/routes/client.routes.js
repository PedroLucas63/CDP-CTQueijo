//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import ClientMiddleware from "../middlewares/ClientMiddleware.js";

//* Importação do módulo de controle dos dados dos clientes:
import ClientController from "../controllers/ClientController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de visualização por chave unica:
router.post("/view", ClientController.view);

//? Rota de visualização de todos os clientes:
router.get("/viewAll", ClientController.viewAll);

//? Rota de atualizar um cliente:
router.put("/update", ClientMiddleware.update(), ClientController.update);

//? Rota de deletar um cliente:
router.delete("/delete", ClientMiddleware.delete(), ClientController.delete);

//! Exportação das rotas:
export default router;
