//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de controle dos dados do funcionários:
import EmployeeController from "../controllers/EmployeeController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de criação:
router.post("/create", EmployeeController.create);

//? Rota de visualização por chave unica:
router.post("/view", EmployeeController.view);

//? Rota de visualização de todos os funcionários:
router.get("/viewAll", EmployeeController.viewAll);

//! Exportação das rotas:
export default router;
