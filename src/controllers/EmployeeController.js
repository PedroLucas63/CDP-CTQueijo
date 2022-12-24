//! Importação dos módulos:
//* Módulo base do funcionário:
import Employee from "../entities/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//* Módulo de validação de dados:
import Validation from "../utils/ValidationUtils.js";

//! Criação da classe de controle dos dados do funcionário:
class EmployeeController {
    //* Método de criação do funcionário:
    async create(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Cria o funcionário:
        let employee = new Employee();

        //? Recebimento dos dados:
        employee.name = `${body.firstName} ${body.lastName}`.trim();
        employee.email = body.email;
        employee.password = body.password;
        employee.role = body.role;
        employee.image = "./images/profiles/default.png";

        //? Senha de verificação:
        const repeatPassword = body.repeatPassword;

        //? Objeto JSON com dados:
        let result = {
            message: null,
            error: {},
            data: null,
        };

        //? Verificação de erros:
        // Tamanho mínimo do nome:
        const nameLenght = 10;

        // Erro de nome curto:
        if (!Validation.name(employee.name, nameLenght)) {
            result.error["name"] = "The name is too short";
        }

        // Erro de e-mail fora do padrão:
        if (!Validation.email(employee.email)) {
            result.error["email"] = "Email is not in default";
        }

        // Erro de senha:
        if (
            !Validation.password(employee.password) ||
            !(employee.password === repeatPassword)
        ) {
            result.error["password"] = [];
            // Erro de senha fraca:
            if (!Validation.password(employee.password)) {
                result.error["password"].push("The password is too weak");
            }

            // Erro de senhas diferentes:
            if (!(employee.password === repeatPassword)) {
                result.error["password"].push("The passwords are different");
            }
        }

        // Cargos conhecidos:
        const roles = ["Manager", "Manufacturer", "Deliveryman"];

        // Erro de cargo desconhecido:
        if (!Validation.role(employee.role, roles)) {
            result.error["role"] = "This role does not exist";
        }

        //? Verifica se ocorreram erros e os retorna se for o caso:
        if (Object.keys(result.error).length != 0) {
            result.message = "Data error";
            return res.json(result);
        }

        //? Cria o funcionário e verifica as mensagens do serviço:
        result = await EmployeeService.create(employee);

        //? Retorna o resultado:
        return res.json(result);
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
        const result = await EmployeeService.view(uniqueValues, {});

        //? Retorna o resultado:
        return res.json(result);
    }

    //* Método de visualizar todos os funcionários:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os funcionários:
        const result = await EmployeeService.viewAll();

        //? Retorna os dados encontrados:
        return res.json(result);
    }

    //* Método de atualizar um funcionário:
    async update(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebe a senha de verificação:
        const repeatPassword = body.repeatPassword;

        //? Cria o funcionário com os dados:
        let employee = new Employee(
            Number(body.id),
            `${body.firstName} ${body.lastName}`.trim(),
            body.email,
            body.password,
            body.role,
            body.image
        );

        //? Faz o pedido do resultado da pesquisa:
        let result = await EmployeeService.view({ id: employee.id }, {});

        //? Verifica se o funcionário foi encontrado:
        if (result.message === "No employees found") {
            // Retorna o resultado da pesquisa:
            return res.json(result);
        }

        //? Verificação dos erros nos dados:
        // Define os erros como um JSON:
        result.error = {};

        // Elemento de nome:
        // Tamanho mínimo do nome:
        const nameLenght = 10;

        // Verificação do nome pequeno:
        if (!(employee.name === "")) {
            if (!Validation.name(employee.name, nameLenght)) {
                result.error["name"] = "The name is too short";
            }
        }

        // Elemento de e-mail:
        if (!(employee.email === "")) {
            if (!Validation.email(employee.email)) {
                result.error["email"] = "Email is not in default";
            }
        }

        // Elemento de senha:
        if (!(employee.password === "")) {
            if (
                !Validation.password(employee.password) ||
                !(employee.password === repeatPassword)
            ) {
                result.error["password"] = [];
                // Erro de senha fraca:
                if (!Validation.password(employee.password)) {
                    result.error["password"].push("The password is too weak");
                }

                // Erro de senhas diferentes:
                if (!(employee.password === repeatPassword)) {
                    result.error["password"].push(
                        "The passwords are different"
                    );
                }
            }
        }

        // Elemento de cargo:
        // Cargos conhecidos:
        const roles = ["Manager", "Manufacturer", "Deliveryman"];

        // Verificação do nome fora dos conhecidos:
        if (!(employee.role === "")) {
            if (!Validation.role(employee.role, roles)) {
                result.error["role"] = "This role does not exist";
            }
        }

        //? Verifica se ocorreram erros e os retorna se for o caso:
        if (Object.keys(result.error).length != 0) {
            result.message = "Data error";
            return res.json(result);
        }

        //? Atualiza o funcionário e verifica as mensagens do serviço:
        result = await EmployeeService.update(employee);

        //? Retorna o resultado:
        return res.json(result);
    }

    //* Método de deletar um funcionário:
    async delete(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebe o identificador do usuário e o nome para o e-mail para verificação:
        const id = body.id;
        const email = body.email;

        //? Busca o funcionário no banco de dados:
        let result = EmployeeService.view({ id: id, email: email }, {});

        //? Verifica se o funcionário foi encontrado:
        if (result.message === "No employees found") {
            // Retorna o resultado da pesquisa:
            return res.json(result);
        }

        //? Se tiver encontrado, remove o funcionário:
        result = EmployeeService.delete({id: id, email: email});
    }
}

//! Exporta o controlador dos funcionários:
export default new EmployeeController();
