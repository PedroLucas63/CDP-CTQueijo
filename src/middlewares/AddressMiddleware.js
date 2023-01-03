//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body } from "express-validator";

//* Módulo de serviço dos endereços:
import AddressService from "../services/AddressService.js";

//* Módulo de pesquisa por CEP:
import cepSearch from "../utils/AddressUtils.js";

//! Criação da classe mediadora dos endereços:
class AddressMiddleware {
    //* Método de construção:
    constructor() {
        //? Recebimento dos dados da pesquisa:
        this.searchAddress = cepSearch(body("cep"));
        this.data = this.searchAddress.data;
    }

    //* Método de validar os dados de criação:
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("cep")
                .trim()
                .isLength(9)
                .isPostalCode("BR")
                .if(this.searchAddress.erros !== 0)
                .withMessage("CEP inválido"),
            body("uf")
                .toUpperCase()
                .trim()
                .isLength(2)
                .equals(this.data.state)
                .withMessage("Unidade federativa inválida"),
            body("city")
                .trim()
                .notEmpty()
                .length({ min: 3, max: 30 })
                .equals(this.data.city)
                .withMessage("Cidade inválida"),
            body("neighborhood")
                .trim()
                .notEmpty()
                .length({ min: 3, max: 50 })
                .if(this.data.neighborhood.notEmpty())
                .equals(this.data.neighborhood)
                .withMessage("Bairro inválido"),
            body("street")
                .trim()
                .notEmpty()
                .length({ min: 3, max: 50 })
                .if(this.data.street.notEmpty())
                .equals(this.data.street)
                .withMessage("Logradouro inválido"),
            body("number").isInt().withMessage("Número inválido"),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    //* Método de validar os dados de atualização:
    update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await AddressService.view(Number(value));
                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }
            }),
            body("cep")
                .if(body("cep").notEmpty() || this.data.cep.notEmpty())
                .trim()
                .isLength(9)
                .isPostalCode("BR")
                .if(this.searchAddress.erros !== 0)
                .withMessage("CEP inválido"),
            body("uf")
                .if(body("uf").notEmpty() || this.data.state.notEmpty())
                .toUpperCase()
                .trim()
                .isLength(2)
                .equals(this.data.state)
                .withMessage("Unidade federativa inválida"),
            body("city")
                .if(body("city").notEmpty() || this.data.city.notEmpty())
                .trim()
                .notEmpty()
                .length({ min: 3, max: 30 })
                .equals(this.data.city)
                .withMessage("Cidade inválida"),
            body("neighborhood")
                .if(
                    body("neighborhood").notEmpty() ||
                        this.data.neighborhood.notEmpty()
                )
                .trim()
                .notEmpty()
                .length({ min: 3, max: 50 })
                .if(this.data.neighborhood.notEmpty())
                .equals(this.data.neighborhood)
                .withMessage("Bairro inválido"),
            body("street")
                .if(body("street").notEmpty() || this.data.street.notEmpty())
                .trim()
                .notEmpty()
                .length({ min: 3, max: 50 })
                .if(this.data.street.notEmpty())
                .equals(this.data.street)
                .withMessage("Logradouro inválido"),
            body("number")
                .if(body("number").notEmpty())
                .isInt()
                .withMessage("Número inválido"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    //* Método de validar os dados de remoção:
    delete() {
        //? Constante com a validação dos campos:
        const remove = [
            body("id").custom(async (value, { req }) => {
                let result = await AddressService.view(Number(value));
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
export default new AddressMiddleware();
