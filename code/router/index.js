//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//! Configuração do Router:
//* Construção do objeto Router:
const routers = new Router();

//* Definição das rotas:
//? Rota inicial:
routers.get("/", (req, res) => {
    res.render("index");
});

//! Exportação dos módulos:
//* Exportação das rotas:
export default routers;
