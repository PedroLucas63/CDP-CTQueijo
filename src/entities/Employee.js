/** Classe representando um funcionário. */
class Employee {
    /**
     * Cria um funcionário.
     * @param {number} id - O identificador.
     * @param {string} name - O nome.
     * @param {string} email - o E-mail.
     * @param {string} password - A senha.
     * @param {string} role - O cargo.
     * @param {string} image - A imagem.
     * @param {DateTime} createdAt - A data de criação.
     */
    constructor(
        id = null,
        name = null,
        email = null,
        password = null,
        role = null,
        image = null,
        createdAt = null
    ) {
        //? Define os dados do funcionário:
        this.data = {
            id: id,
            name: name,
            email: email,
            password: password,
            role: role,
            image: image,
            createdAt: createdAt,
        };
    }

    //* Métodos Set:
    /**
     * Define o nome do funcionário.
     */
    set name(name) {
        this.data.name = name;
    }

    /**
     * Define o email do funcionário.
     */
    set email(email) {
        this.data.email = email;
    }

    /**
     * Define a senha do funcionário.
     */
    set password(password) {
        this.data.password = password;
    }

    /**
     * Define o cargo do funcionário.
     */
    set role(role) {
        this.data.role = role;
    }

    /**
     * Define a imagem do funcionário.
     */
    set image(image) {
        this.data.image = image;
    }

    /**
     * Define a data de criação do funcionário.
     */
    set createdAt(createdAt) {
        this.data.createdAt = createdAt;
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
     * Pega o nome do funcionário.
     * @return {string} O nome do funcionário.
     */
    get name() {
        return this.data.name;
    }

    /**
     * Pega o email do funcionário.
     * @return {string} O email do funcionário.
     */
    get email() {
        return this.data.email;
    }

    /**
     * Pega a senha do funcionário.
     * @return {string} A senha do funcionário.
     */
    get password() {
        return this.data.password;
    }

    /**
     * Pega o cargo do funcionário.
     * @return {string} O cargo do funcionário.
     */
    get role() {
        return this.data.role;
    }

    /**
     * Pega a imagem do funcionário.
     * @return {string} A imagem do funcionário.
     */
    get image() {
        return this.data.image;
    }

    /**
     * Pega a data de criação do funcionário.
     * @return {DateTime} A data de criação do funcionário.
     */
    get createdAt() {
        return this.data.createdAt;
    }

    /**
     * Pega os dados não vazios do funcionário.
     * @return {json} Os dados não vazios do funcionário.
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
export default Employee;
