//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço dos pedidos:
import OrderService from "../services/OrderService.js";

//* Módulo de serviço dos produtos:
import ProductService from "../services/ProductService.js";

//* Módulo de verificar se uma cadeira de caracteres é um número:
import isNumber from "../utils/NumberUtils.js";

/** Classe representando os mediadores do pedido. */
class OrderMiddleware {
    /**
     * Cria as validações dos campos da criação de um pedido.
     * @return {json} O resultado da validação dos dados passados.
     */
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("product").custom(async (values) => {
                for (let i = 0; i < values.length; i++) {
                    let result = await ProductService.view({ name: values[i] });
                    if (result.error !== 0) {
                        throw new Error("Identificador desconhecido");
                    }
                }
            }),
            body("quantity").custom(async (values, {req}) => {
                if (values.length !== req.body.product.length) {
                    throw new Error("Quantidade inválida");
                }

                for (let i = 0; i < values.length; i++) {
                    if (isNumber(values[i])) {
                        if (Number(values[i] <= 0)) {
                            throw new Error("Quantidade inválida");
                        }
                    } else {
                        throw new Error("Quantidade inválida");
                    }
                }
            }),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    /**
     * Cria as validações dos campos da atualização de um pedido.
     * @return {json} O resultado da validação dos dados passados.
     */
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await OrderService.view(Number(value));
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("product").custom(async (value) => {
                let result = await ProductService.view({ name: value });
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("quantity")
                .if(body("quantity").notEmpty())
                .isInt()
                .withMessage("Quantidade inválida"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    /**
     * Cria as validações dos campos da deletação de um pedido.
     * @return {json} O resultado da validação dos dados passados.
     */
    delete() {
        //? Constante com a validação dos campos:
        const remove = [
            body("id").custom(async (value, { req }) => {
                let result = await OrderService.view(Number(value));
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
export default new OrderMiddleware();
