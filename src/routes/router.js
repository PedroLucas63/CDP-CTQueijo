//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//* Importação do módulo mediador de sessão logado:
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

//* Importação do módulo de rotas dos funcionários:
import EmployeeRouter from "./employee.routes.js";

//* Importação do módulo de rotas dos produtos:
import ProductRouter from "./product.routes.js";

//* Importação do módulo de rotas dos endereços:
import AddressRouter from "./address.routes.js";

//* Importação do módulo de rotas dos clientes:
import ClientRouter from "./client.routes.js";

//* Importação do módulo de rotas dos pedidos:
import OrderRouter from "./order.routes.js";

//* Importação do módulo de rotas das vendas:
import SaleRouter from "./sale.routes.js";

//* Importação do módulo de rotas de Login:
import LoginRouter from "./login.routes.js";

//* Importação do módulo de controle dos dados do produto:
import ProductController from "../controllers/ProductController.js";

//! Configuração do Router:
//* Construção do objeto Router:
const router = new Router();

//* Definição das rotas:
//? Rota inicial:
router.get("/", (req, res) => {
    res.render("pages/index");
});

//? Rota Carrinho:
router.get("/carrinho", (req, res) => {
    res.render("pages/cart");
});

//? Rota Dashboard:
router.get("/dashboard", AuthMiddleware, (req, res) => {
    return res.render("pages/dashboard/index.ejs", {
        user: req.session.user
    });
});

//? Rota Pedidos do Dashboard:
router.get("/dashboard/pedidos", AuthMiddleware, (req, res) => {
    res.render("pages/dashboard/requests.ejs");
});

//? Rota Edição do Dashboard:
router.get("/dashboard/alterar", AuthMiddleware, (req, res) => {
    res.render("pages/dashboard/edition.ejs");
});

//? Uso das rotas dos funcionários:
router.use("/employee", AuthMiddleware, EmployeeRouter);

//? Rota de visualização de todos os produtos:
router.get("/produtos", ProductController.viewAll);

//? Uso das rotas dos produtos:
router.use("/product", ProductRouter);

//? Uso das rotas de endereços:
router.use("/address", AddressRouter);

//? Uso das rotas de clientes:
router.use("/client", ClientRouter);

//? Uso das rotas de pedidos:
router.use("/order", OrderRouter);

//? Uso das rotas de vendas:
router.use("/sale", SaleRouter);

//? Uso das rotas de login:
router.use("/", LoginRouter);

//? Rota de erro 404:
router.use(function (req, res, next) {
    res.status(404).render("pages/404");
});

//! Exportação das rotas:
export default router;
