//! Importação dos módulos:
//* Módulo do bcrypt:
import bcrypt from "bcrypt";

//* Módulo base do funcionário:
import Employee from "../entities/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//! Criação da classe de controle dos dados do login:
class LoginController {
    //* Método de realizar login no servidor:
    async login(req, res) {
        //? Verifica se já existe um funcionário logado na sessão:
        if (req.session.user !== null && req.session.user !== undefined) {
            return res.status(400).json("Já está logado!");
        }

        //? Cria o objeto de resultado:
        let result = {
            message: "Dados incorretos",
            error: 3,
            data: null,
        };

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
            return res.json(result);
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
            req.session.user = employee.id;

            // Modifica os dados do resultado:
            result.message = "Login executado com sucesso";
            result.error = 0;
            result.data = data;

            // Retorna o resultado com o sucesso:
            return res.status(200).json(result);
        }

        //? Retorna o resultado com erro:
        return res.status(400).json(result);
    }

    //* Método de fazer o logout no servidor:
    async logout(req, res) {
        //? Determina o usuário logado como vazio:
        req.session.user = null;

        //? Determina o resultado:
        const result = {
            message: "Deslogado com sucesso",
            error: 0,
            data: null,
        };

        //? Faz o retorno do resultado:
        return res.json(result);
    }
}

//! Exporta o controlador do login:
export default new LoginController();
