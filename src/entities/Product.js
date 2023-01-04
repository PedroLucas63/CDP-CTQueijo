//! Criação da classe dos produtos:
class Product {
    //* Método de construção da classe:
    constructor(id = null, name = null, price = null, image = null) {
        this.data = {
            id: id,
            name: name,
            price: price,
            image: image,
        };
    }

    //* Métodos Set:
    //? Método de definir o nome:
    set name(name) {
        this.data.name = name;
    }

    //? Método de definir o preço:
    set price(price) {
        this.data.price = price;
    }

    //? Método de definir a imagem:
    set image(image) {
        this.data.image = image;
    }

    //* Métodos Get:
    //? Método de receber o id:
    get id() {
        return this.data.id;
    }

    //? Método de receber o nome:
    get name() {
        return this.data.name;
    }

    //? Método de receber o preço:
    get price() {
        return this.data.price;
    }

    //? Método de receber a imagem:
    get image() {
        return this.data.image;
    }

    //* Método de receber os dados não vazios e diferentes de ID:
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
