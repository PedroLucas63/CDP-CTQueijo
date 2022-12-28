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

//? Rota Dashboard:
router.get("/dashboard", (req, res) => {
    res.render("pages/dashboard");
});

//? Rota Pedidos:
router.get("/pedidos", (req, res) => {
    res.render("pages/pedidos");
});

//? Rota de erro 404:
router.use(function (req, res, next) {
    res.status(404).render("pages/404");
});

//! Exportação dos módulos:
//* Exportação das rotas:
export default router;
