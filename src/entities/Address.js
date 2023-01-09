//! Criação da classe de endereço:
class Address {
    //* Método de construção da classe:
    constructor(
        id = null,
        cep = null,
        uf = null,
        city = null,
        neighborhood = null,
        street = null,
        number = null
    ) {
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
    //? Método de definir o CEP:
    set cep(cep) {
        this.data.cep = cep;
    }

    //? Método de definir a UF:
    set uf(uf) {
        this.data.uf = uf;
    }

    //? Método de definir a cidade:
    set city(city) {
        this.data.city = city;
    }

    //? Método de definir o bairro:
    set neighborhood(neighborhood) {
        this.data.neighborhood = neighborhood;
    }

    //? Método de definir o logradouro:
    set street(street) {
        this.data.street = street;
    }

    //? Método de definir o número residencial/comercial:
    set number(number) {
        this.data.number = number;
    }

    //* Métodos Get:
    //? Método de receber o id:
    get id() {
        return this.data.id;
    }

    //? Método de receber o CEP:
    get cep() {
        return this.data.cep;
    }

    //? Método de receber a UF:
    get uf() {
        return this.data.uf;
    }

    //? Método de receber a cidade:
    get city() {
        return this.data.city;
    }

    //? Método de receber o bairro:
    get neighborhood() {
        return this.data.neighborhood;
    }

    //? Método de definir o logradouro:
    get street() {
        return this.data.street;
    }

    //? Método de definir o número residencial/comercial:
    get number() {
        return this.data.number;
    }

    //* Método de receber os dados não vazios:
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
