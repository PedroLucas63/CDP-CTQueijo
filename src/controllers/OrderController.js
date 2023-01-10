//! Importação dos módulos:
//* Módulo base do pedido:
import Order from "../entities/Order.js";

//* Módulo de serviço do pedido:
import OrderService from "../services/OrderService.js";

//* Módulo de serviço de produtos:
import ProductService from "../services/ProductService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

/** Classe representando o controle de dados do pedido. */
class OrderController {
    /**
     * Visualiza um pedido com base no identificador e/ou nome enviado pelo frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados encontrados do pedido.
     */
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento do identificador do pedido:
        const id = Number(body.id);

        //? Faz o pedido do resultado da pesquisa:
        const result = await OrderService.view(id);

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o pedido não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    /**
     * Visualiza todos os pedidos.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados encontrados de todos os pedidos.
     */
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os pedidos:
        const result = await OrderService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os pedidos não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    /**
     * Atualiza um pedido com base nos dados enviados no frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados atualizados do pedido.
     */
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

        //? Recebe o ID do produto:
        const productId = Number(body.productId);

        //? Recebe o produto do pedido:
        const product = await ProductService.view({ id: productId });

        //? Recebe a quantidade e define o valor do pedido:
        const quantity = body.quantity;
        const price = quantity * product.data.price;

        //? Cria o pedido com os dados:
        let order = new Order(
            Number(body.id),
            body.name,
            productId,
            quantity,
            price,
            body.phone
        );

        //? Atualiza o pedido e verifica as mensagens do serviço:
        result = await OrderService.update(order);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o pedido não foi editado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    /**
     * Deleta um pedido com base no identificador enviado no frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados do pedido deletado.
     */
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

        //? Recebe o identificador do pedido:
        const id = Number(body.id);

        //? Se tiver encontrado, remove o pedido:
        result = await OrderService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o pedido não foi deletado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos pedidos:
export default new OrderController();
