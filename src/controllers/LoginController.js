//! Importação dos módulos:
//* Módulo do bcrypt:
import bcrypt from "bcrypt";

//* Módulo base do funcionário:
import Employee from "../entities/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//! Criação da classe de controle dos dados do login:
class LoginController {
    /**
     * Padrão de login no servidor.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados padrão do login.
     */
    async index(req, res) {
        //? Verifica se já tem um login ativo:
        if (req.session.user !== null && req.session.user !== undefined) {
            return res.redirect("/dashboard");
        }

        //? Se não tiver login ele renderiza a página de login:
        return res.status(200).render("pages/login");
    }

    /**
     * Realizar login no servidor.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados de realização do login.
     */
    async login(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebe os dados de login:
        const email = body.email;
        const password = body.password;

        //? Faz a pesquisa do funcionário por meio do email:
        const { data } = await EmployeeService.view({ email: email });

        //? Verifica se não tiveram dados encontrados:
        if (data === null) {
            // Retorna o resultado com erro:
            return res.status(400).redirect("/login");
        }

        //? Cria um funcionário com os dados encontrados:
        const employee = new Employee(
            data.id,
            data.name,
            data.email,
            data.password,
            data.role,
            data.image,
            data.createdAt
        );

        //? Verifica se as senhas são iguais:
        if (bcrypt.compareSync(password, employee.password)) {
            // Salva o login na sessão:
            req.session.user = employee.partialData();

            // Retorna o resultado com o sucesso:
            return res.status(200).redirect("/dashboard");
        }

        //? Retorna o resultado com erro:
        return res.status(400).redirect("/login");
    }

    /**
     * Faz logout no servidor.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados de logout.
     */
    async logout(req, res) {
        //? Determina o usuário logado como vazio:
        req.session.user = null;

        //? Faz o retorno do resultado:
        return res.status(200).redirect("/");
    }
}

//! Exporta o controlador do login:
export default new LoginController();
