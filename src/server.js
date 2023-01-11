import app from './app.js';

//! Iniciação do servidor:
//* Definindo dados do servidor:
const hostname = "localhost";
const port = process.env.PORT || 3000;

//* Abertura do servidor:
app.listen(port, () => {
    console.log("Completed server opening!");
    console.log(`Access in http://${hostname}:${port}`);
});
