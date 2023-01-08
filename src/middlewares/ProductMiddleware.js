//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço dos produtos:
import ProductService from "../services/ProductService.js";

//! Criação da classe mediadora dos produtos:
class ProductMiddleware {
    //* Método de validar os dados de criação:
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("name")
                .trim()
                .isLength({ min: 4, max: 45 })
                .withMessage("Nome inválido"),
            body("price").notEmpty().isFloat().withMessage("Preço inválido"),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    //* Método de validar os dados de atualização:
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await ProductService.view({ id: Number(value) });
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("name")
                .if(body("name").notEmpty())
                .trim()
                .isLength({ min: 4, max: 45 })
                .withMessage("Nome inválido"),
            body("price")
                .if(body("price").notEmpty())
                .isFloat()
                .withMessage("Preço inválido"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    //* Método de validar os dados de remoção:
    delete() {
        //? Constante com a validação dos campos:
        const remove = [
            body("id").custom(async (value) => {
                let result = await ProductService.view({ id: Number(value) });
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
export default new ProductMiddleware();
