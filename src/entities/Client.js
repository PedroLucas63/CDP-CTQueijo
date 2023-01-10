/** Classe representando um cliente. */
class Client {
    /**
     * Cria um cliente.
     * @param {number} id - O identificador.
     * @param {string} name - O nome.
     * @param {string} type - O tipo.
     * @param {string} cnpj - O CNPJ.
     * @param {string} email - O e-mail.
     * @param {string} phone - O telefone.
     */
    constructor(
        id = null,
        name = null,
        type = null,
        cnpj = null,
        email = null,
        phone = null
    ) {
        //? Define os dados do cliente:
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
    /**
     * Define o nome do cliente.
     */
    set name(name) {
        this.data.name = name;
    }

    /**
     * Define o tipo de cliente.
     */
    set type(type) {
        this.data.type = type;
    }

    /**
     * Define o cnpj do cliente.
     */
    set cnpj(cnpj) {
        this.data.cnpj = cnpj;
    }

    /**
     * Define o e-mail do cliente.
     */
    set email(email) {
        this.data.email = email;
    }

    /**
     * Define o telefone do cliente.
     */
    set phone(phone) {
        this.data.phone = phone;
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
     * Pega nome do cliente.
     * @return {string} O nome do cliente.
     */
    get name() {
        return this.data.name;
    }

    /**
     * Pega o tipo do cliente.
     * @return {string} O tipo do cliente.
     */
    get type() {
        return this.data.type;
    }

    /**
     * Pega CNPJ do cliente.
     * @return {string} O CNPJ do cliente.
     */
    get cnpj() {
        return this.data.cnpj;
    }

    /**
     * Pega o e-mail do cliente.
     * @return {string} O e-mail do cliente.
     */
    get email() {
        return this.data.email;
    }

    /**
     * Pega o telefone do cliente.
     * @return {string} O telefone do cliente.
     */
    get phone() {
        return this.data.phone;
    }

    /**
     * Pega os dados não vazios do cliente.
     * @return {json} Os dados não vazios do cliente.
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
export default Client;
