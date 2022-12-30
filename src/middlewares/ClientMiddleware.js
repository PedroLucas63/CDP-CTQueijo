//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço dos clientes:
import ClientService from "../services/ClientService.js";

//! Criação da classe mediadora dos clientes:
class ClientMiddleware {
    //* Método de validar os dados de criação:
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("firstName")
                .trim()
                .isLength({ min: 5, max: 55 })
                .withMessage("Primeiro nome inválido"),
            body("lastName")
                .trim()
                .isLength({ min: 5, max: 55 })
                .withMessage("Último nome inválido"),
            body("type")
                .trim()
                .isLength({ min: 5, max: 50 })
                .withMessage("Tipo inválido"),
            body("cnpj")
                .trim()
                .isLength(14)
                .withMessage("CNPJ inválido"),
            body("email")
                .not()
                .isEmpty()
                .isEmail()
                .withMessage("Email inválido"),
            body("phone")
                .trim()
                .isLength(19)
                .withMessage("Telefone inválido"),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    //* Método de validar os dados de atualização:
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await ClientService.view({ id: Number(value) });
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("firstName")
                .if(
                    body("firstName").not().isEmpty() &&
                        body("lastName").not().isEmpty()
                )
                .trim()
                .isLength({ min: 5, max: 55 })
                .withMessage("Primeiro nome inválido"),
            body("lastName")
                .if(
                    body("lastName").not().isEmpty() &&
                        body("firstName").not().isEmpty()
                )
                .trim()
                .isLength({ min: 5, max: 55 })
                .withMessage("Último nome inválido"),
            body("type")
                .if(body("type").not().isEmpty())
                .isIn(["Instituto de ensino", "Organização não governamental"])
                .withMessage("Tipo inválido"),
            body("cnpj")
                .if(body("cnpj").not().isEmpty())
                .withMessage("CNPJ inválido"),
            body("email")
                .if(body("email").not().isEmpty())
                .isEmail()
                .withMessage("Email inválido"),
            body("phone")
                .if(body("phone").not().isEmpty())
                .withMessage("Telefone inválido"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    //* Método de validar os dados de remoção:
    delete() {
        //? Constante com a validação dos campos:
        const remove = [
            body("id").custom(async (value, { req }) => {
                let result = await ClientService.view({
                    id: Number(value),
                    email: req.body.email,
                });
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("email").isEmail().withMessage("Email inválido"),
        ];

        //* Retorno da constante de validação:
        return remove;
    }
}

//* Exportação da classe instânciada:
export default new ClientMiddleware();
