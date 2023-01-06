//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço das vendas:
import SaleService from "../services/SaleService.js";

//* Módulo de serviço dos produtos:
import ClientService from "../services/ClientService.js";

//* Módulo de serviço dos endereços:
import AddressService from "../services/AddressService.js";

//! Criação da classe mediadora das vendas:
class SaleMiddleware {
    //* Método de validar os dados de criação:
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

    //* Método de validar os dados de atualização:
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await SaleService.view(Number(value));
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("clientId")
                .if(body("clientId").notEmpty())
                .custom(async (value) => {
                    let result = await ClientService.view(Number(value));
                    if (result.error !== 0) {
                        throw new Error(
                            "Identificador de cliente desconhecido"
                        );
                    }
                }),
            body("addressId")
                .if(body("addressId").notEmpty())
                .custom(async (value) => {
                    let result = await AddressService.view(Number(value));
                    if (result.error !== 0) {
                        throw new Error(
                            "Identificador de endereço desconhecido"
                        );
                    }
                }),
            body("situation")
                .if(body("situation").notEmpty())
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Situação inválida"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    //* Método de validar os dados de remoção:
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
