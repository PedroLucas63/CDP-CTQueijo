//! Importação dos módulos:
//* Módulo de entidade dos produtos:
import Product from "../entities/Product.js";

//* Módulo de serviços dos produtos:
import ProductService from "../services/ProductService.js";

//! Função de criar os produtos:
async function createProducts() {
    //* Define os dados dos produtos padrões:
    //? Nomes:
    const names = [
        "Doce de Leite",
        "Iogurte de Ameixa",
        "Iogurte de Graviola",
        "Iogurte de Morango",
        "Iogurte de Salada",
        "Queijo Coalho",
        "Queijo do Reino",
    ];

    //? Preço:
    const prices = [12.8, 7.8, 7.5, 8.0, 7.8, 23.0, 57.4];

    //? Imagens:
    const images = [
        "doce-de-leite.jpg",
        "iogurte-ameixa.png",
        "iogurte-graviola.png",
        "iogurte-morango.png",
        "iogurte-salada.jpg",
        "queijo-coalho.jpeg",
        "queijo-do-reino.jpg",
    ];

    //* Define a quantidade de produtos criados:
    let created = 0;

    //* Percorre todos os produtos:
    for (let i = 0; i < names.length; i++) {
        //? Procura o produto no banco de dados:
        let result = await ProductService.view({ name: names[i] });

        //? Verficia se foi encontrado:
        if (result.error === 14) {
            //? Cria o produto:
            let product = new Product(
                null,
                names[i],
                prices[i],
                `/assets/products/${images[i]}`
            );

            //? Faz a tentativa de criação do produto:
            result = await ProductService.create(product);

            //? Verifica se criou:
            if (result.error === 0) {
                // Conta os produtos criados:
                created++;
            }
        }
    }

    //* Verifica se todos os produtos foram criados:
    if (created === 7) {
        //? Informa que todos os produtos foram criados:
        console.log("All products successfully created!");
    } else if (created !== 0) {
        //? Informa a quantidade de produtos criados:
        console.log(`${created} new products were successfully created!`);
    }
}

//! Exportação da função:
export default createProducts;
