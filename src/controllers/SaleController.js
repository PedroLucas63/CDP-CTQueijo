//! Importação dos módulos:
//* Módulo base da venda:
import Sale from "../entities/Sale.js";

//* Módulo de serviço da venda:
import SaleService from "../services/SaleService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//* Importa o módulo de arquivos do sistema:
import fs from "fs";

//! Criação da classe de controle dos dados da venda:
class SaleController {
    //* Método de criação da venda:
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

        //? Cria a venda:
        let sale = new Sale();

        //? Recebimento dos dados:
        Sale.price = Number(body.price);
        Sale.clientId = Number(body.clientId);
        Sale.addressId = Number(body.addressId);
        Sale.situation = body.situation.trim();

        //? Cria a venda e verifica as mensagens do serviço:
        result = await SaleService.create(sale);

        //? Define o status como sucesso na criação:
        let status = 201;

        //? Verifica se a venda não foi criada:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar uma venda pelo id:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Faz o pedido do resultado da pesquisa:
        const result = await SaleService.view(Number(body.id));

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se a venda não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar todas as vendas:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todas as vendas:
        const result = await SaleService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se as vendas não foram encontradas:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de atualizar uma venda:
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

        //? Cria a venda com os dados:
        let sale = new Sale(
            Number(body.id),
            Number(body.price),
            Number(body.clientId),
            Number(body.addressId),
            body.situation.trim(),
        );

        //? Atualiza a venda e verifica as mensagens do serviço:
        result = await SaleService.update(sale);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se a venda não foi editada:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar uma venda:
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

        //? Recebe o identificador da venda e o nome para o e-mail para verificação:
        const id = Number(body.id);

        //? Se tiver encontrado, remove a venda:
        result = await SaleService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se a venda não foi deletado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos vendaes:
export default new SaleController();
