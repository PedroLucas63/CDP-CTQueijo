//! Criação da classe de pedido:
class Order {
    //* Método de construção da classe:
    constructor(
        id = null,
        productId = null,
        quantity = null,
        price = null,
        saleId = null
    ) {
        this.data = {
            id: id,
            productId: productId,
            quantity: quantity,
            price: price,
            saleId: saleId,
        };
    }

    //* Métodos Set:
    //? Método de definir o identificador de produto:
    set productId(productId) {
        this.data.productId = productId;
    }

    //? Método de definir a quantidade:
    set quantity(quantity) {
        this.data.quantity = quantity;
    }

    //? Método de definir o preço:
    set price(price) {
        this.data.price = price;
    }

    //? Método de definir o identificador da venda:
    set saleId(saleId) {
        this.data.saleId = saleId;
    }

    //* Métodos Get:
    //? Método de receber o id:
    get id() {
        return this.data.id;
    }

    //? Método de receber o identificador do produto:
    get productId() {
        return this.data.productId;
    }

    //? Método de receber a quantidade:
    get quantity() {
        return this.data.quantity;
    }

    //? Método de receber o preço:
    get price() {
        return this.data.price;
    }

    //? Método de definir o identificador de venda:
    get saleId() {
        return this.data.saleId;
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
export default Order;
