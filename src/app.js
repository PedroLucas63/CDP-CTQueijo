//! Importação de módulos:
//* Importação do módulos express:
import express from "express";
import session from "express-session";
import upload from "express-fileupload";

//* Importação da função de interfaces da rede:
import { networkInterfaces } from "os";

//* Importação da função de interfaces da rede:
import { networkInterfaces } from "os";

//* Importação do módulo dotenv:
import dotenv from "dotenv";

//* Importação do módulo de criar o adminstrador padrão:
import createAdmin from "./utils/EmployeeDefault.js";

//* Importação de módulos locais:
import router from "./routes/router.js";

//! Configurações do dotenv:
//* Definição da configuração:
dotenv.config();

//! Configuração do express:
//* Construção da aplicação express:
const app = express();

//* Definição da engine do projeto:
app.set("view engine", "ejs");
app.set("views", "./views");

//* Define o uso do upload de arquivos:
app.use(
    upload({
        limits: { fileSize: 20 * 1024 * 1024 },
        defCharset: "utf8",
        safeFileNames: / +/,
        parseNested: true,
    })
);

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
app.use(router);

//! Criação do adminstrador padrão:
await createAdmin(
    process.env.ADMIN_ID,
    process.env.ADMIN_NAME,
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD,
    process.env.ADMIN_ROLE,
    process.env.ADMIN_IMAGE
);

//! Iniciação do servidor:
//* Recebe as informações da rede:
const networkInfo = networkInterfaces();

//* Definindo dados do servidor:
const hostname = networkInfo["Wi-Fi"][1].address;
const port = process.env.PORT || 3000;

//* Abertura do servidor:
app.listen(port, () => {
    console.log("Completed server opening!");
    console.log(`Access in http://${hostname}:${port}`);
});
