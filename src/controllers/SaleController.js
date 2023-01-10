//! Importação dos módulos:
//* Módulo base da venda:
import Sale from "../entities/Sale.js";

//* Módulo base do endereço:
import Address from "../entities/Address.js";

//* Módulo base do client:
import Client from "../entities/Client.js";

//* Módulo base do pedido:
import Order from "../entities/Order.js";

//* Módulo de serviço da venda:
import SaleService from "../services/SaleService.js";

//* Módulo de serviço do endereço:
import AddressService from "../services/AddressService.js";

//* Módulo de serviço do cliente:
import ClientService from "../services/ClientService.js";

//* Módulo de serviço dos produtos:
import ProductService from "../services/ProductService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

/** Classe representando os controladores da venda. */
class SaleController {
    /**
     * Cria uma venda com base no identificador enviado pelo frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados criados da venda.
     */
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

        //? Cria o endereço:
        let address = new Address();

        //? Define os dados do endereço:
        address.cep = body.cep;
        address.uf = body.uf;
        address.city = body.city;
        address.neighborhood = body.neighborhood;
        address.street = body.street;
        address.number = Number(body.number);

        //? Faz a criação do endereço:
        result = await AddressService.create(address);
        let addressId;

        //? Verifica se não aconteceu algum erro na criação do endereço:
        if (result.error === 0) {
            // Recebe o ID do endereço:
            addressId = result.data.id;

            // Cria o cliente:
            let client = new Client();

            // Define os dados do endereço:
            client.name = body.name;
            client.type = body.type;
            client.cnpj = body.cnpj;
            client.email = body.email;
            client.phone = body.phone;

            // Faz a criação do cliente:
            result = await ClientService.create(client);
        }

        //? Verifica se não aconteceu algum erro na criação do cliente:
        if (result.error === 0) {
            // Recebe o ID do client:
            const clientId = result.data.id;

            // Cria um array dos pedidos:
            let orders = [];

            // Define a quantidade de falhas:
            let fail = 0;

            // Define o preço da venda completa:
            let price = 0;

            // Percorre os produtos e a quantidade:
            for (let i = 0; i < body.product.length; i++) {
                // Pesquisa o produto:
                result = await ProductService.view({ name: body.product[i] });

                // Verifica se foi encontrado:
                if (result.error === 0) {
                    // Define os dados do pedido:
                    let order = new Order();

                    order.productId = result.data.id;
                    order.quantity = Number(body.quantity[i]);
                    order.price =
                        Number(result.data.price) * Number(body.quantity[i]);

                    // Faz a soma dos preços:
                    price += order.price;

                    // Adiciona o pedido no array:
                    orders.push(order.partialData());
                } else {
                    fail++;
                }
            }

            // Verifica se não aconteceu nenhuma falha:
            if (fail === 0) {
                // Cria a venda:
                let sale = new Sale();

                // Define os valores:
                sale.price = price;
                sale.deliveryAt = new Date(body.deliveryAt);
                sale.clientId = clientId;
                sale.addressId = addressId;
                sale.situation = "Em análise";
                sale.orders = orders;

                //? Cria a venda e verifica as mensagens do serviço:
                result = await SaleService.create(sale);
            }
        }

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

    /**
     * Visualiza uma venda com base no identificador enviado pelo frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados encontrados da venda.
     */
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

    /**
     * Visualiza todas as vendas.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados encontrados de todas as vendas.
     */
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

    /**
     * Atualiza uma venda com base nos dados enviados no frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados atualizados da venda.
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

        //? Cria a venda com os dados:
        let sale = new Sale(
            Number(body.id),
            null,
            null,
            null,
            null,
            null,
            body.situation.trim(),
            body.message.trim()
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

    /**
     * Deleta uma venda com base no identificador enviado no frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados da venda deletada.
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
