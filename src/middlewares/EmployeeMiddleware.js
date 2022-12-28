//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço dos funcionários:
import EmployeeService from "../services/EmployeeService.js";

//! Criação da classe mediadora dos funcionários:
class EmployeeMiddleware {
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
            body("email")
                .not()
                .isEmpty()
                .isEmail()
                .withMessage("Email inválido"),
            body("password")
                .isStrongPassword({
                    minLength: 10,
                    maxLenght: 24,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    pointsPerUnique: 1,
                })
                .withMessage("Senha inválida"),
            body("confirmPassword").custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Senhas diferentes");
                } else {
                    return true;
                }
            }),
            body("role")
                .isIn(["Manager", "Manufacturer", "Deliveryman"])
                .withMessage("Cargo inválido"),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    //* Método de validar os dados de atualização:
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await EmployeeService.view({ id: Number(value) });
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
            body("email")
                .if(body("email").not().isEmpty())
                .isEmail()
                .withMessage("Email inválido"),
            body("password")
                .if(body("password").not().isEmpty())
                .isStrongPassword({
                    minLength: 10,
                    maxLenght: 24,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    pointsPerUnique: 1,
                })
                .withMessage("Senha inválida"),
            body("confirmPassword")
                .if(body("password").not().isEmpty())
                .custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error("Senhas diferentes");
                    } else {
                        return true;
                    }
                }),
            body("role")
                .if(body("role").not().isEmpty())
                .isIn(["Manager", "Manufacturer", "Deliveryman"])
                .withMessage("Cargo inválido"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    //* Método de validar os dados de remoção:
    delete() {
        //? Constante com a validação dos campos:
        const remove = [
            body("id").custom(async (value, { req }) => {
                let result = await EmployeeService.view({ id: Number(value), email: req.body.email });
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
export default new EmployeeMiddleware();
