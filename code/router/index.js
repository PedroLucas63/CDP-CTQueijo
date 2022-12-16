//! Importação dos módulos:
//* Importação do módulo de Router:
import { Router } from "express";

//! Configuração do Router:
//* Construção do objeto Router:
const routers = new Router();

//* Definição das rotas:
routers.get("/", (req, res) => {
    res.json({ message: "Servidor iniciado!" });
});

//! Exportação dos módulos:
//* Exportação das rotas:
export default routers;