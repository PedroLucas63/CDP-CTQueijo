//! Importação dos módulos:
//* Módulo base do funcionário:
import Employee from "../models/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//! Criação da classe de controle dos dados do funcionário:
class EmployeeController {
    //* Método de criação do funcionário:
    async create(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento dos dados:
        const id = null;
        const name = `${body.firstName} ${body.lastName}`.trim();
        const email = body.email;
        const password = body.password;
        const role = body.role;
        const image = "./images/profiles/default.png";
        const createdAt = null;

        //? Verificação de erros:
        // JSON com erros:
        let errors = {};

        // Erro de nome curto:
        if (name.length < 6) {
            errors["name"] = "The name is too short";
        }

        // Erro de e-mail fora do padrão:
        // Regex com modelo de e-mail:
        let reEmail = /\S+@\S+\.\S+/;

        // Verifica se o o e-mail corresponde ao modelo:
        if (!reEmail.test(email)) {
            errors["email"] = "Email is not in default";
        }

        // Erro de senha fraca:
        // Regex com modelo de senha forte:
        /* Exigências da senha:
           - Mínimo de 8 caracteres
           - Mínimo de 1 letra maiúscula
           - Mínimo de 1 número
           - Mínimo de 1 símbolo: $*&@#
           - Sem a presença de sequências com caracteres iguais
        */
        let rePassword =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;

        // Verifica se a senha corresponde ao modelo:
        if (!rePassword.test(password)) {
            errors["password"] = "The password is too weak";
        }

        // Erro de cargo desconhecido:
        // Cargos conhecidos:
        let roles = ["Manager", "Manufacturer", "Deliveryman"];

        // Informa se o cargo está entre os listados:
        if (roles.indexOf(role) === -1) {
            errors["role"] = "This role does not exist";
        }

        //? Verifica se ocorreram erros e os retorna se for o caso:
        if (Object.keys(errors).length != 0) {
            return res.json({ message: "Data with errors", error: errors });
        }

        //? Cria o funcionário caso não tenham acontecido erros:
        const employee = new Employee(id, name, email, password, role, image, createdAt);

        //? Cria o funcionário e retorna as mensagens do serviço:
        return res.json(await EmployeeService.create(employee));
    }

    //* Método de visualizar um funcionário pelo id ou email:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento dos dados em um JSON:
        const values = {
            id: body.id,
            email: body.email,
        };

        //? Gera o JSON que possui valores que foram definidos:
        const uniqueValues = JSON.parse(JSON.stringify(values), (key, value) =>
            value === undefined ? undefined : value
        );

        //? Faz o pedido do resultado da pesquisa:
        const result = await EmployeeService.view(uniqueValues);

        //? Retorna o resultado:
        return res.json(result);
    }
}

export default new EmployeeController();
