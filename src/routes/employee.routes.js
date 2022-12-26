//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import EmployeeMiddleware from "../middlewares/EmployeeMiddleware.js";

//* Importação do módulo de controle dos dados do funcionários:
import EmployeeController from "../controllers/EmployeeController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de criação:
router.post("/create", EmployeeMiddleware.create(), EmployeeController.create);

//? Rota de visualização por chave unica:
router.post("/view", EmployeeController.view);

//? Rota de visualização de todos os funcionários:
router.get("/viewAll", EmployeeController.viewAll);

//? Rota de atualizar um funcionário:
router.put("/update", EmployeeMiddleware.update(), EmployeeController.update);

//? Rota de deletar um funcionário:
router.delete("/delete", EmployeeController.delete);

//! Exportação das rotas:
export default router;
