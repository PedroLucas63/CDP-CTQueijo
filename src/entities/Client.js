//! Criação da classe de cliente:
class Client {
    //* Método de construção da classe:
    constructor(
        id = null,
        name = null,
        type = null,
        cnpj = null,
        email = null,
        phone = null
    ) {
        this.data = {
            id: id,
            name: name,
            type: type,
            cnpj: cnpj,
            email: email,
            phone: phone,
        };
    }

    //* Métodos Set:
    //? Método de definir o nome:
    set name(name) {
        this.data.name = name;
    }

    //? Método de definir o tipo:
    set type(type) {
        this.data.type = type;
    }

    //? Método de definir o cnpj:
    set cnpj(cnpj) {
        this.data.cnpj = cnpj;
    }

    //? Método de definir o email:
    set email(email) {
        this.data.email = email;
    }

    //? Método de definir o telefone:
    set phone(phone) {
        this.data.phone = phone;
    }

    //* Métodos Get:
    //? Método de receber o id:
    get id(){
        return this.data.id;
    }
    
    //? Método de receber o nome:
    get name() {
        return this.data.name;
    }

    //? Método de receber o tipo:
    get type() {
        return this.data.type;
    }

    //? Método de receber o cnpj:
    get cnpj() {
        return this.data.cnpj;
    }

    //? Método de receber o email:
    get email() {
        return this.data.email;
    }

    //? Método de receber a telefone:
    get phone() {
        return this.data.phone;
    }

    //* Método de receber os dados não vazios:
    partialData() {
        //? Remove os dados que estão vazios e o de ID:
        const newData = JSON.parse(JSON.stringify(this.data), (key, value) =>
            value === null ||
            value === undefined ||
            value === ""
                ? undefined
                : value
        );

        //? Retorna os dados:
        return newData;
    }
}

//! Exportação da classe:
export default Client;
