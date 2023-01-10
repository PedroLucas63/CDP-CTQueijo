//! Importação dos módulos:
//* Módulo de receber informações do corpo:
import { body, Result } from "express-validator";

//* Módulo de serviço dos endereços:
import AddressService from "../services/AddressService.js";

//* Módulo de pesquisa por CEP:
import cepSearch from "../utils/AddressUtils.js";

/** Classe representando os mediadores do endereço. */
class AddressMiddleware {
    /**
     * Cria os dados do endereço encontrado e existente.
     */
    constructor() {
        this.data = {
            cep: "",
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            number: 0,
        };

        this.address = {
            cep: "",
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            number: 0,
        };
    }

    /**
     * Cria as validações dos campos da criação de um endereço.
     * @return {json} O resultado da validação dos dados passados.
     */
    create() {
        //? Constante com a validação dos campos:
        const create = [
            body("cep")
                .trim()
                .isLength(9)
                .isPostalCode("BR")
                .custom(async (value) => {
                    let searchAddress = await cepSearch(value);
                    let data = searchAddress.data;
                    this.address = data;
                    return data.cep !== undefined;
                })
                .withMessage("CEP inválido"),
            body("uf")
                .toUpperCase()
                .trim()
                .isLength(2)
                .custom((value) => {
                    return this.address.state === value;
                })
                .withMessage("Unidade federativa inválida"),
            body("city")
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 30 })
                .custom((value) => {
                    return this.address.city === value;
                })
                .withMessage("Cidade inválida"),
            body("neighborhood")
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 50 })
                .custom((value) => {
                    if (this.address.neighborhood) {
                        return this.address.neighborhood === value;
                    }
                    return true;
                })
                .withMessage("Bairro inválido"),
            body("street")
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 50 })
                .custom((value) => {
                    if (this.address.street) {
                        return this.address.street === value;
                    }
                    return true;
                })
                .withMessage("Logradouro inválido"),
            body("number")
                .if(body("number").notEmpty())
                .isInt()
                .withMessage("Número inválido"),
        ];

        //* Retorno da constante de validação:
        return create;
    }

    /**
     * Cria as validações dos campos da atualização de um endereço.
     * @return {json} O resultado da validação dos dados passados.
     */ update() {
        //? Constante com a validação dos campos:
        const update = [
            body("id").custom(async (value) => {
                let result = await AddressService.view(Number(value));

                if (result.error !== 0) {
                    throw new Error("Identificador desconhecido");
                }

                this.data = result.data;
            }),
            body("cep")
                .custom((value) => {
                    return value !== "" || this.data.cep !== undefined;
                })
                .trim()
                .isLength(9)
                .isPostalCode("BR")
                .custom(async (value) => {
                    let searchAddress = await cepSearch(value);
                    let data = searchAddress.data;
                    this.address = data;
                    return data.cep !== undefined;
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
                    return this.address.state === value;
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
                    return this.address.city === value;
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
                .custom((value) => {
                    if (this.address.neighborhood) {
                        return this.address.neighborhood === value;
                    }
                    return true;
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
                .custom((value) => {
                    if (this.address.street) {
                        return this.address.street === value;
                    }
                    return true;
                })
                .withMessage("Logradouro inválido"),
            body("number")
                .if(body("number").notEmpty())
                .isInt()
                .withMessage("Número inválido"),
        ];

        //* Retorno da constante de validação:
        return update;
    }

    /**
     * Cria as validações dos campos da deletação de um endereço.
     * @return {json} O resultado da validação dos dados passados.
     */ delete() {
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
