//! Importação dos módulos:
//* Módulo do bcrypt:
import bcrypt from "bcrypt";

//* Módulo base do funcionário:
import Employee from "../models/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//! Criação da classe de controle dos dados do login:
class LoginController {
    //* Método de realizar login no servidor:
    async login(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebe os dados de login:
        const email = body.email;
        const password = body.password;

        //? Faz a pesquisa do funcionário por meio do email:
        const { data } = await EmployeeService.view({ email: email });

        //? Cria o objeto de resultado:
        let result = {
            message: "Unknown data",
            error: "Wrong email or password",
            data: null,
        };

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
            req.session.logged = true;

            // Modifica os dados do resultado:
            result.message = "Login executed successfully";
            result.error = null;
            result.data = data;

            // Retorna o resultado com o sucesso:
            return res.json(result);
        }

        //? Retorna o resultado com erro:
        return res.json(result);
    }

    //* Método de fazer o logout no servidor:
    async logout(req, res) {
        //? Determina o logged como falso:
        req.session.logged = false;

        //? Determina o resultado:
        const result = {
            message: "Logged out successfully",
            error: null,
            data: null,
        };

        //? Faz o retorno do resultado:
        return res.json(result);
    }
}

//! Exporta o controlador do login:
export default new LoginController();
