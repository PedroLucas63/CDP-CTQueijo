//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota inicial:
router.get("/", (req, res) => {
    res.render("pages/index");
});

//? Rota Produtos:
router.get("/produtos", (req, res) => {
    res.render("pages/produtos");
});

//? Rota de erro 404:
router.use(function (req, res, next) {
    res.status(404).render("pages/404");
});

//! Exportação dos módulos:
//* Exportação das rotas:
export default router;
