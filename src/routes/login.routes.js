//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo de controle dos dados do funcionários:
import LoginController from "../controllers/LoginController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota da página login:
router.get("/login", LoginController.index);

//? Rota da página de logar:
router.post("/logar", LoginController.login);

//? Rota de logout:
router.get("/logout", LoginController.logout);

//! Exportação das rotas:
export default router;
