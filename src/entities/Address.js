/** Classe representando um endereço. */
class Address {
    /**
     * Cria um endereço.
     * @param {number} id - O identificador.
     * @param {string} cep - O código de endereçamento postal.
     * @param {string} uf - A unidade federativa.
     * @param {string} city - A cidade.
     * @param {string} neighborhood - O bairro.
     * @param {string} street - O logradouro.
     * @param {number} number - O número.
     */
    constructor(
        id = null,
        cep = null,
        uf = null,
        city = null,
        neighborhood = null,
        street = null,
        number = null
    ) {
        //? Define os dados do endereço:
        this.data = {
            id: id,
            cep: cep,
            uf: uf,
            city: city,
            neighborhood: neighborhood,
            street: street,
            number: number,
        };
    }

    //* Métodos Set:
    /**
     * Define o código de endereçamento postal.
     */
    set cep(cep) {
        this.data.cep = cep;
    }

    /**
     * Define a unidade federativa.
     */
    set uf(uf) {
        this.data.uf = uf;
    }

    /**
     * Define a cidade.
     */
    set city(city) {
        this.data.city = city;
    }

    /**
     * Define o bairro.
     */
    set neighborhood(neighborhood) {
        this.data.neighborhood = neighborhood;
    }

    /**
     * Define o logradouro.
     */
    set street(street) {
        this.data.street = street;
    }

    /**
     * Define o número.
     */
    set number(number) {
        this.data.number = number;
    }

    //* Métodos Get:
    /**
     * Pega o identificador.
     * @return {number} O identificador.
     */
    get id() {
        return this.data.id;
    }

    /**
     * Pega o código de endereçamento postal.
     * @return {string} O código de endereçamento postal.
     */
    get cep() {
        return this.data.cep;
    }

    /**
     * Pega a unidade federativa.
     * @return {string} A unidade federativa.
     */    
    get uf() {
        return this.data.uf;
    }

    /**
     * Pega a cidade.
     * @return {string} A cidade.
     */        
    get city() {
        return this.data.city;
    }

    /**
     * Pega o bairro.
     * @return {string} O bairro.
     */    
    get neighborhood() {
        return this.data.neighborhood;
    }

    /**
     * Pega o logradouro.
     * @return {string} O logradouro.
     */    
    get street() {
        return this.data.street;
    }

    /**
     * Pega o número.
     * @return {number} O número.
     */        
    get number() {
        return this.data.number;
    }

    /**
     * Pega os dados não vazios do endereço.
     * @return {json} Os dados não vazios do endereço.
     */
    partialData() {
        //? Remove os dados que estão vazios e o de ID:
        const newData = JSON.parse(JSON.stringify(this.data), (key, value) =>
            value === null || value === undefined || value === ""
                ? undefined
                : value
        );

        //? Retorna os dados:
        return newData;
    }
}

//! Exportação da classe:
export default Address;
