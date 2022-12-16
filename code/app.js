//! Importação de módulos:
//* Importação do módulos express:
import express from "express";
import session from "express-session";

//* Importação do módulo dotenv:
import dotenv from "dotenv";

//* Importação de módulos locais:
import routers from "./router/index.js";

//! Configurações do dotenv:
//* Definição da configuração:
dotenv.config();

//! Configuração do express:
//* Construção da aplicação express:
const app = express();

//* Definição da engine do projeto:
app.set("view engine", "ejs");
app.set("views", "./view");

//* Define a pasta public para conteúdo estático:
app.use(express.static("./public"));

//* Define que o app vai passar informações via Json:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Configuração da sessão:
//? Define o proxy como ativo:
app.set("trust proxy", true);

//* Define os dados da sessão:
app.use(
    session({
        secret: process.env.SHA_256_HASH,
        resave: true,
        saveUninitialized: true,
        cookie: false,
    })
);

//* Define o uso das rotas:
app.use(routers);

//! Iniciação do servidor:
//* Definindo dados do servidor:
const hostname = "127.0.0.1";
const port = 3000;
7;

//* Abertura do servidor:
app.listen(port, () => {
    console.log("Completed server opening!");
    console.log(`Access in ${hostname}:${port}`);
});
