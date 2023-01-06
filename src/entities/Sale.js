//! Criação da classe de venda:
class Sale {
    //* Método de construção da classe:
    constructor(
        id = null,
        createdAt = null,
        price = null,
        deliveryAt = null,
        clientId = null,
        addressId = null,
        situation = null,
        orders = null
    ) {
        this.data = {
            id: id,
            createdAt: createdAt,
            price: price,
            deliveryAt: deliveryAt,
            clientId: clientId,
            addressId: addressId,
            situation: situation,
            orders: orders,
        };
    }

    //* Métodos Set:

    //? Método de definir a data que a venda foi solicitada:
    set createdAt(createdAt) {
        this.data.createdAt = createdAt;
    }

    //? Método de definir o preço:
    set price(price) {
        this.data.price = price;
    }

    //? Método de definir a data de entrega da venda:
    set deliveryAt(deliveryAt) {
        this.data.deliveryAt = deliveryAt;
    }

    //? Método de definir o identificador do cliente:
    set clientId(clientId) {
        this.data.clientId = clientId;
    }

    //? Método de definir o identificador do endereço:
    set addressId(addressId) {
        this.data.addressId = addressId;
    }

    //? Método de definir a situação da venda:
    set situation(situation) {
        this.data.situation = situation;
    }

    //? Método de definir os pedidos da venda:
    set orders(orders) {
        this.data.orders = { create: orders };
    }

    //* Métodos Get:
    //? Método de receber o id:
    get id() {
        return this.data.id;
    }

    //? Método de receber a data que a venda foi solicitada:
    get createdAt() {
        return this.data.createdAt;
    }

    //? Método de receber o preço:
    get price() {
        return this.data.price;
    }

    //? Método de receber a data de entrega da venda:
    get deliveryAt() {
        return this.data.deliveryAt;
    }

    //? Método de receber o identificador do cliente:
    get clientId() {
        return this.data.clientId;
    }

    //? Método de receber o identificador do endereço:
    get addressId() {
        return this.data.addressId;
    }

    //? Método de receber a situação da venda:
    get situation() {
        return this.data.situation;
    }

    //? Método de receber os pedidos da venda:
    get orders() {
        return this.data.orders;
    }

    //* Método de receber os dados não vazios:
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
