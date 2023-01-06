//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço dos pedidos:
import OrderService from "../services/OrderService.js";

//* Módulo de serviço dos produtos:
import ProductService from "../services/ProductService.js";

//* Módulo de verificar se uma cadeira de caracteres é um número:
import isNumber from "../utils/NumberUtils.js";

//! Criação da classe mediadora dos pedidos:
class OrderMiddleware {
    //* Método de validar os dados de criação:
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
            body("quantity")
                .isLength(body("product").length)
                .withMessage("Quantidade inválida")
                .custom(async (values) => {
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

    //* Método de validar os dados de atualização:
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

    //* Método de validar os dados de remoção:
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
