//! Importação dos módulos:
//* Módulo base do endereço:
import Address from "../entities/Address.js";

//* Módulo de serviço do endereço:
import AddressService from "../services/AddressService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

/** Classe representando os controladores do endereço. */
class AddressController {
    /**
     * Visualiza um endereço com base no identificador enviado pelo frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados encontrados do endereço.
     */
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento do identificador do endereço:
        const id = Number(body.id);

        //? Faz o pedido do resultado da pesquisa:
        const result = await AddressService.view(id);

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o endereço não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    /**
     * Visualiza todos os endereços.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados encontrados de todos os endereços.
     */
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os endereços:
        const result = await AddressService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os endereços não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    /**
     * Atualiza um endereço com base nos dados enviados no frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados atualizados do endereço.
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

        //? Cria o endereço com os dados:
        let address = new Address(
            Number(body.id),
            body.cep,
            body.state,
            body.city,
            body.neighborhood,
            body.street,
            Number(body.number)
        );

        //? Atualiza o endereço e verifica as mensagens do serviço:
        result = await AddressService.update(address);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o endereço não foi editado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    /**
     * Deleta um endereço com base no identificador enviado no frontend.
     * @param {*} req - Os requisitos enviados pela página.
     * @param {*} res - A resposta enviada pelo controlador.
     * @return {page} A página com os dados do endereço deletado.
     */ async delete(req, res) {
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

        //? Recebe o identificador do endereço:
        const id = Number(body.id);

        //? Se tiver encontrado, remove o endereço:
        result = await AddressService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o endereço não foi deletado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos endereços:
export default new AddressController();
