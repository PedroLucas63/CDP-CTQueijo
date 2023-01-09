//! Importação dos módulos:
//* Módulo base do cliente:
import Client from "../entities/Client.js";

//* Módulo de serviço do cliente:
import ClientService from "../services/ClientService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//! Criação da classe de controle dos dados do cliente:
class ClientController {
    //* Método de visualizar um cliente pelo id:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento do identificador do cliente:
        const id = Number(body.id);

        //? Faz o pedido do resultado da pesquisa:
        const result = await ClientService.view(id);

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o cliente não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar todos os clientes:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os clientes:
        const result = await ClientService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os clientes não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de atualizar um cliente:
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

        //? Cria o cliente com os dados:
        let client = new Client(
            Number(body.id),
            body.name,
            body.type,
            body.cnpj,
            body.email,
            body.phone
        );

        //? Atualiza o cliente e verifica as mensagens do serviço:
        result = await ClientService.update(client);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o cliente não foi editado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar um cliente:
    async delete(req, res) {
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

        //? Recebe o identificador do usuário e o nome para o e-mail para verificação:
        const id = Number(body.id);

        //? Se tiver encontrado, remove o cliente:
        result = await ClientService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o cliente não foi deletado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos clientes:
export default new ClientController();
