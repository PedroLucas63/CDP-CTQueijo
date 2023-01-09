//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de validação de dados:
import AddressMiddleware from "../middlewares/AddressMiddleware.js";

//* Importação do módulo de controle dos dados do endereço:
import AddressController from "../controllers/AddressController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota de visualização por chave unica:
router.post("/view", AddressController.view);

//? Rota de visualização de todos os endereços:
router.get("/viewAll", AddressController.viewAll);

//? Rota de atualizar um endereço:
router.put("/update", AddressMiddleware.update(), AddressController.update);

//? Rota de deletar um endereço:
router.delete("/delete", AddressMiddleware.delete(), AddressController.delete);

//! Exportação das rotas:
export default router;
