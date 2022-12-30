//! Importação dos módulos:
//* Módulo base do produto:
import Product from "../entities/Product.js";

//* Módulo de serviço do produto:
import ProductService from "../services/ProductService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//! Criação da classe de controle dos dados do produto:
class ProductController {
    //* Método de criação do produto:
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

        //? Cria o produto:
        let product = new Product();

        //? Recebimento dos dados:
        product.name = body.name.trim();

        //? Cria o produto e verifica as mensagens do serviço:
        result = await ProductService.create(product);

        //? Define o status como sucesso na criação:
        let status = 201;

        //? Verifica se o produto não foi criado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar um produto pelo id ou email:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Faz o pedido do resultado da pesquisa:
        const result = await ProductService.view(Number(body.id));

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o produto não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar todos os produtos:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os produtos:
        const result = await ProductService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os produtos não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de atualizar um produto:
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

        //? Cria o produto com os dados:
        let product = new Product(Number(body.id), body.name.trim());

        //? Atualiza o produto e verifica as mensagens do serviço:
        result = await ProductService.update(product);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o produto não foi atualizado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar um produto:
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

        //? Recebe o identificador do produto e o nome para o e-mail para verificação:
        const id = Number(body.id);

        //? Se tiver encontrado, remove o produto:
        result = await ProductService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o produto não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos produtos:
export default new ProductController();
