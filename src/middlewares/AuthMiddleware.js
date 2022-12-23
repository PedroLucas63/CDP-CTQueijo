//! Função mediadora de verificar se o funcionário está logado:
function AuthMiddleware(req, res, next) {
    //* Verifica se o funcionário se encontra logado:
    if (req.session.logged) {
        //? Continua a execução:
        next();
    } else {
        //? Redireciona para a página principal:
        return res.redirect("/");
    }
}

//! Exporta a função de mediadora:
export default AuthMiddleware;
