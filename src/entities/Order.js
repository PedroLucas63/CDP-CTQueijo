/** Classe representando um pedido. */
class Order {
    /**
     * Cria um pedido.
     * @param {number} id - O identificador.
     * @param {number} productId - O identificador do produto.
     * @param {number} quantity - A quantidade.
     * @param {number} price - O preço.
     * @param {number} saleId - O identificador da venda.
     */
    constructor(
        id = null,
        productId = null,
        quantity = null,
        price = null,
        saleId = null
    ) {
        //? Define os dados do pedido:
        this.data = {
            id: id,
            productId: productId,
            quantity: quantity,
            price: price,
            saleId: saleId,
        };
    }

    //* Métodos Set:
    /**
     * Define o identificador de produto.
     */
    set productId(productId) {
        this.data.productId = productId;
    }

    /**
     * Define a quantidade.
     */
    set quantity(quantity) {
        this.data.quantity = quantity;
    }

    /**
     * Define o preço.
     */
    set price(price) {
        this.data.price = price;
    }

    /**
     * Define o identificador da venda.
     */
    set saleId(saleId) {
        this.data.saleId = saleId;
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
     * Pega o identificador do produto.
     * @return {number} O identificador do produto.
     */
    get productId() {
        return this.data.productId;
    }

    /**
     * Pega a quantidade.
     * @return {number} A quantidade.
     */
    get quantity() {
        return this.data.quantity;
    }

    /**
     * Pega o preço.
     * @return {number} O preço.
     */
    get price() {
        return this.data.price;
    }

    /**
     * Pega o identificador da venda.
     * @return {number} O identificador da venda.
     */
    get saleId() {
        return this.data.saleId;
    }

    /**
     * Pega os dados não vazios do pedido.
     * @return {json} Os dados não vazios do pedido.
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
export default Order;
