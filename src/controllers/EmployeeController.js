//! Importação dos módulos:
//* Módulo base do funcionário:
import Employee from "../entities/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//* Módulo de validação de dados:
import ValidationUtils from "../utils/ValidationUtils.js";

//! Criação da classe de controle dos dados do funcionário:
class EmployeeController {
    //* Método de construção da classe:
    constructor() {
        //? Tamanho do nome:
        this.nameLenght = 10;

        //? Cargos conhecidos:
        this.roles = ["Manager", "Manufacturer", "Deliveryman"];
    }
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

        //? Objeto JSON com dados:
        let result = {
            message: null,
            error: {},
            data: null,
        };

        //? Verificação de erros:
        // Erro de nome curto:
        if (!ValidationUtils.name(employee.name, this.nameLenght)) {
            result.error["name"] = "The name is too short";
        }

        // Erro de e-mail fora do padrão:
        if (!ValidationUtils.email(employee.email)) {
            result.error["email"] = "Email is not in default";
        }

        // Erro de senha fraca:
        if (!ValidationUtils.password(employee.password)) {
            result.error["password"] = "The password is too weak";
        }

        // Erro de cargo desconhecido:

        // Informa se o cargo está entre os listados:
        if (!ValidationUtils.role(employee.role, this.roles)) {
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
        let result = await EmployeeService.view(
            { id: employee.id },
            { id: true }
        );

        //? Verifica se o funcionário foi encontrado:
        if (result.message === "No employees found") {
            // Retorna o resultado da pesquisa:
            return res.json(result);
        }

        //? Verificação dos erros nos dados:
        // Define os erros como um JSON:
        result.error = {};

        // Elemento de nome:
        if (!(employee.name === "")) {
            if (!ValidationUtils.name(employee.name, this.nameLenght)) {
                result.error["name"] = "The name is too short";
            }
        }

        // Elemento de e-mail:
        if (!(employee.email === "")) {
            if (!ValidationUtils.email(employee.email)) {
                result.error["email"] = "Email is not in default";
            }
        }

        // Elemento de senha:
        if (!(employee.password === "")) {
            if (!ValidationUtils.password(employee.password)) {
                result.error["password"] = "The password is too weak";
            }
        }

        // Elemento de cargo:
        if (!(employee.role === "")) {
            if (!ValidationUtils.role(employee.role, roles)) {
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
}

//! Exporta o controlador dos funcionários:
export default new EmployeeController();
