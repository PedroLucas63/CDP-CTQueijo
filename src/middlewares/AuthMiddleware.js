//! Importação de módulos:
//* Importação da função de procura dos serviços do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//! Função mediadora de verificar se o funcionário está logado:
async function AuthMiddleware(req, res, next) {
    //* Verifica se o funcionário se encontra logado:
    if (req.session.user !== null && req.session.user !== undefined) {
        //? Procura o funcionário no banco de dados:
        const result = await EmployeeService.view({id: req.session.user});

        //? Verifica se o usuário não se encontra no banco de dados:
        if(result.error !== 0){
            return res.status(401).redirect("/logout");
        }

        //? Continua a execução:
        next();
    } else {
        //? Redireciona para a página principal:
        return res.status(401).redirect("/");
    }
}

//! Exporta a função de mediadora:
export default AuthMiddleware;
