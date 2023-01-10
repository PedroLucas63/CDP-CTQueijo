/** Classe representando uma venda. */
class Sale {
    /**
     * Cria uma venda.
     * @param {number} id - O identificador.
     * @param {dateTime} createdAt - A data de criação.
     * @param {number} price - O preço.
     * @param {dateTime} deliveryAt - A data de entrega.
     * @param {number} clientId - O identificador do cliente.
     * @param {number} addressId - O identificador do endereço.
     * @param {string} situation - A situação.
     * @param {string} message - A mensagem.
     * @param {string} orders - O pedido.
     */
    constructor(
        id = null,
        createdAt = null,
        price = null,
        deliveryAt = null,
        clientId = null,
        addressId = null,
        situation = null,
        message = null,
        orders = null
    ) {
        //? Define os dados da venda:
        this.data = {
            id: id,
            createdAt: createdAt,
            price: price,
            deliveryAt: deliveryAt,
            clientId: clientId,
            addressId: addressId,
            situation: situation,
            message: message,
            orders: orders,
        };
    }

    //* Métodos Set:

    /**
     * Define a data que a venda foi solicitada.
     */
    set createdAt(createdAt) {
        this.data.createdAt = createdAt;
    }

    /**
     * Define o preço da venda.
     */
    set price(price) {
        this.data.price = price;
    }

    /**
     * Define a data de entrega da venda.
     */
    set deliveryAt(deliveryAt) {
        this.data.deliveryAt = deliveryAt;
    }

    /**
     * Define o identificador do cliente.
     */
    set clientId(clientId) {
        this.data.clientId = clientId;
    }

    /**
     * Define o identificador do endereço.
     */
    set addressId(addressId) {
        this.data.addressId = addressId;
    }

    /**
     * Define a situação da venda.
     */
    set situation(situation) {
        this.data.situation = situation;
    }

    /**
     * Define a mensagem da venda.
     */
    set message(message) {
        this.data.situation = message;
    }

    /**
     * Define os pedidos da venda.
     */
    set orders(orders) {
        this.data.orders = { create: orders };
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
     * Pega a data que a venda foi solicitada.
     * @return {dateTime} A data de solicitação.
     */
    get createdAt() {
        return this.data.createdAt;
    }

    /**
     * Pega o preço.
     * @return {number} O preço.
     */
    get price() {
        return this.data.price;
    }

    /**
     * Pega a data de entrega da venda.
     * @return {dateTime} A data de entrega.
     */
    get deliveryAt() {
        return this.data.deliveryAt;
    }

    /**
     * Pega o identificador do cliente.
     * @return {number} O identificador do cliente.
     */
    get clientId() {
        return this.data.clientId;
    }

    /**
     * Pega o identificador do endereço.
     * @return {number} O identificador do endereço.
     */
    get addressId() {
        return this.data.addressId;
    }

    /**
     * Pega a situação da venda.
     * @return {string} A situação.
     */
    get situation() {
        return this.data.situation;
    }

    /**
     * Pega a mensagem da venda.
     * @return {string} A mensagem da venda.
     */
    get message() {
        return this.data.message;
    }

    /**
     * Pega os pedidos.
     * @return {string} Os pedidos.
     */
    get orders() {
        return this.data.orders;
    }

    /**
     * Pega os dados não vazios da venda.
     * @return {json} Os dados não vazios da venda.
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
export default Sale;
