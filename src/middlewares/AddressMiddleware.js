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
        this.searchAddress = async () => {
            await cepSearch(body("cep"));
        };
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
                .custom(() => {
                    return this.data.cep !== undefined;
                })
                .withMessage("CEP inválido"),
            body("uf")
                .toUpperCase()
                .trim()
                .isLength(2)
                .custom((value) => {
                    return this.data.state === value;
                })
                .withMessage("Unidade federativa inválida"),
            body("city")
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 30 })
                .custom((value) => {
                    return this.data.city === value;
                })
                .withMessage("Cidade inválida"),
            body("neighborhood")
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 50 })
                .custom(() => {
                    return this.data.neighborhood !== "";
                })
                .custom((value) => {
                    return this.data.neighborhood === value;
                })
                .withMessage("Bairro inválido"),
            body("street")
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 50 })
                .custom(() => {
                    return this.data.street !== "";
                })
                .custom((value) => {
                    return this.data.street === value;
                })
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
                .custom((value) => {
                    return value !== "" || this.data.cep !== undefined;
                })
                .trim()
                .isLength(9)
                .isPostalCode("BR")
                .custom(() => {
                    return this.data.cep !== undefined;
                })
                .withMessage("CEP inválido"),
            body("uf")
                .custom((value) => {
                    return value !== "" || this.data.state !== undefined;
                })
                .toUpperCase()
                .trim()
                .isLength(2)
                .custom((value) => {
                    return this.data.state === value;
                })
                .withMessage("Unidade federativa inválida"),
            body("city")
                .custom((value) => {
                    return value !== "" || this.data.city !== undefined;
                })
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 30 })
                .custom((value) => {
                    return this.data.city === value;
                })
                .withMessage("Cidade inválida"),
            body("neighborhood")
                .custom((value) => {
                    return (
                        value !== "" ||
                        (this.data.neighborhood !== undefined &&
                            this.data.neighborhood !== "")
                    );
                })
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 50 })
                .custom(() => {
                    return this.data.neighborhood !== "";
                })
                .custom((value) => {
                    return this.data.neighborhood === value;
                })
                .withMessage("Bairro inválido"),
            body("street")
                .custom((value) => {
                    return (
                        value !== "" ||
                        (this.data.street !== undefined &&
                            this.data.street !== "")
                    );
                })
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 50 })
                .custom(() => {
                    return this.data.street !== "";
                })
                .custom((value) => {
                    return this.data.street === value;
                })
                .withMessage("Logradouro inválido"),
            body("number").isInt().withMessage("Número inválido"),
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
