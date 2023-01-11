//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço das vendas:
import SaleService from "../services/SaleService.js";

/** Classe representando os mediadores da venda. */
class SaleMiddleware {
    /**
     * Cria as validações dos campos da criação de uma venda.
     * @return {json} O resultado da validação dos dados passados.
     */
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("deliveryAt")
                .isISO8601()
                .withMessage("Data ou horário inválido"),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    /**
     * Cria as validações dos campos da atualização de uma venda.
     * @return {json} O resultado da validação dos dados passados.
     */
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await SaleService.view(Number(value));
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("situation")
                .if(body("situation").notEmpty())
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Situação inválida"),
            body("message")
                .if(body("message").notEmpty())
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Mensagem inválida"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    /**
     * Cria as validações dos campos da deletação de uma venda.
     * @return {json} O resultado da validação dos dados passados.
     */
    delete() {
        //? Constante com a validação dos campos:
        const remove = [
            body("id").custom(async (value) => {
                let result = await SaleService.view(Number(value));
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
        ];

        //* Retorno da constante de validação:
        return remove;
    }
}

//* Exportação da classe instânciada:
export default new SaleMiddleware();
