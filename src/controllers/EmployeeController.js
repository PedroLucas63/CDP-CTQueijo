//! Importação dos módulos:
//* Módulo base do funcionário:
import Employee from "../entities/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//! Criação da classe de controle dos dados do funcionário:
class EmployeeController {
    //* Método de criação do funcionário:
    async create(req, res) {
        //? Objeto JSON com o resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Recebe o resultado da validação do express:
        const errors = validationResult(req);

        //? Verifica se ocorreram erros na validação:
        if (!errors.isEmpty()) {
            // Define uma mensagem e um erro:
            result.message = "Erro nos dados passados";
            result.error = errors.array();

            // Retorna o resultado com o status de falha:
            return res.status(400).json(result);
        }

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

        //? Cria o funcionário e verifica as mensagens do serviço:
        result = await EmployeeService.create(employee);

        //? Define o status como sucesso na criação:
        let status = 201;

        //? Verifica se o usuário não foi criado:
        if (result.message === "Falha na criação") {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }
        //? Retorna o resultado:
        return res.status(status).json(result);
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
        return res.status(200).json(result);
    }

    //* Método de visualizar todos os funcionários:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os funcionários:
        const result = await EmployeeService.viewAll();

        //? Retorna os dados encontrados:
        return res.status(200).json(result);
    }

    //* Método de atualizar um funcionário:
    async update(req, res) {
        //? Objeto JSON com o resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Recebe o resultado da validação do express:
        const errors = validationResult(req);

        //? Verifica se ocorreram erros na validação:
        if (!errors.isEmpty()) {
            // Define uma mensagem e um erro:
            result.message = "Erro nos dados passados";
            result.error = errors.array();

            // Retorna o resultado com o status de falha:
            return res.status(400).json(result);
        }

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

        //? Atualiza o funcionário e verifica as mensagens do serviço:
        result = await EmployeeService.update(employee);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o usuário não foi atualizado:
        if (result.message === "Falha na atualização") {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }
        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar um funcionário:
    async delete(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebe o identificador do usuário e o nome para o e-mail para verificação:
        const id = body.id;
        const email = body.email;

        //? Busca o funcionário no banco de dados:
        let result = await EmployeeService.view({ id: id, email: email });

        //? Verifica se o funcionário foi encontrado:
        if (result.message === "Funcionário não encontrado") {
            // Retorna o resultado da pesquisa:
            return res.status(400).json(result);
        }

        //? Se tiver encontrado, remove o funcionário:
        result = await EmployeeService.delete({ id: id, email: email });

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o usuário não foi removido:
        if (result.message === "Erro na conexão com o banco de dados") {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos funcionários:
export default new EmployeeController();
