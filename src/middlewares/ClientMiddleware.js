//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de validação de CNPJ:
import { cnpj } from "cpf-cnpj-validator";

//* Módulo de serviço dos clientes:
import ClientService from "../services/ClientService.js";

//! Criação da classe mediadora dos clientes:
class ClientMiddleware {
    //* Método de construção da classe:
    constructor() {
        //? Definição dos tipos:
        this.types = ["Instituição Pública", "Instituição Privada", "ONG"];
    }
    //* Método de validar os dados de criação:
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("name").trim().notEmpty().withMessage("Nome inválido"),
            body("type").trim().isIn(this.types).withMessage("Tipo inválido"),
            body("cnpj")
                .trim()
                .isLength(18)
                .custom((value) => {
                    return cnpj.isValid(value);
                })
                .withMessage("CNPJ inválido"),
            body("email")
                .not()
                .isEmpty()
                .isEmail()
                .withMessage("Email inválido"),
            body("phone")
                .trim()
                .isLength(19)
                .isMobilePhone("pt-BR")
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
            body("name")
                .if(body("name").notEmpty())
                .trim()
                .notEmpty()
                .withMessage("Nome inválido"),
            body("type")
                .if(body("type").notEmpty())
                .trim()
                .isIn(this.types)
                .withMessage("Tipo inválido"),
            body("cnpj")
                .if(body("cnpj").notEmpty())
                .trim()
                .isLength(18)
                .custom((value) => {
                    return cnpj.isValid(value);
                })
                .withMessage("CNPJ inválido"),
            body("email")
                .if(body("email").notEmpty())
                .not()
                .isEmpty()
                .isEmail()
                .withMessage("Email inválido"),
            body("phone")
                .if(body("phone").notEmpty())
                .trim()
                .isLength(19)
                .isMobilePhone("pt-BR")
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
