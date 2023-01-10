/** Classe representando um produto. */
class Product {
    /**
     * Cria um produto.
     * @param {number} id - O identificador.
     * @param {string} name - O nome.
     * @param {number} price - O preço.
     * @param {string} image - A imagem.
     */
    constructor(id = null, name = null, price = null, image = null) {
        //? Define os dados do produto:
        this.data = {
            id: id,
            name: name,
            price: price,
            image: image,
        };
    }

    //* Métodos Set:
    /**
     * Define o nome do produto.
     */
    set name(name) {
        this.data.name = name;
    }

    /**
     * Define o preço do produto.
     */
    set price(price) {
        this.data.price = price;
    }

    /**
     * Define a imagem do produto.
     */
    set image(image) {
        this.data.image = image;
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
     * Pega o nome do produto.
     * @return {string} O nome do produto.
     */
    get name() {
        return this.data.name;
    }

    /**
     * Pega o preço do produto.
     * @return {number} O preço do produto.
     */
    get price() {
        return this.data.price;
    }

    /**
     * Pega a imagem do produto.
     * @return {string} A imagem do produto.
     */
    get image() {
        return this.data.image;
    }

    /**
     * Pega os dados não vazios do produto.
     * @return {json} Os dados não vazios do produto.
     */
    partialData() {
        //? Remove os dados que estão vazios e o de ID:
        const newData = JSON.parse(JSON.stringify(this.data), (key, value) =>
            value === null || value === undefined || value === "" || value === 0
                ? undefined
                : value
        );

        //? Retorna os dados:
        return newData;
    }
}

//! Exportação da classe:
export default Product;
