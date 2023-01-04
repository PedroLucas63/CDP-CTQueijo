//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

//! Criação da classe de serviços do funcionario:
class ProductService {
    //* Construção da classe:
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();
    }

    //* Método de criar um novo produto no banco de dados:
    async create(product) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados importantes do produto:
        let data = product.partialData();

        //? Testa a criação do produto:
        try {
            // Executa o comando de criação o produto:
            let createProduct = await this.prisma.product.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createProduct;
        } catch (e) {
            // Verifica se é um tipo de erro conhecido:
            if (e.code === "P2002") {
                // Define a mensagem e o erro conhecido:
                result.message = "Falha na criação";
                result.error = 43;
            } else {
                // Define a mensagem e o erro de conexão:
                result.message = "Erro na conexão com o banco de dados";
                result.error = 4;
            }
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de receber dados de um produto por meio de chave unica:
    async view(uniqueValues) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Produto encontrado",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização do produto:
        try {
            // Executa a visualização do produto
            const product = await this.prisma.product.findFirst({
                where: uniqueValues,
            });

            // Verifica se não foi encontrado um produto:
            if (product === null) {
                // Define a mensagem que não foi encontrado:
                result.message = "Produto não encontrado";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = product;
            }
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de receber dados de todos os produtos:
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Produtos encontrados",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os produtos:
            const products = await this.prisma.product.findMany();

            // Salva os produtos nos dados do resultado:
            result.data = products;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de atualizar um produto no banco de dados:
    async update(product) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados que foram modificados:
        let data = product.partialData();

        //? Testa a atualização do produto:
        try {
            // Executa o comando de atualizar o produto:
            let updateproduct = await this.prisma.product.update({
                data: data,
                where: { id: product.id },
            });

            // Dá os dados atualizados:
            result.data = updateproduct;
        } catch (e) {
            // Verifica se é um tipo de erro conhecido:
            if (e.code === "P2002") {
                // Define a mensagem e o erro conhecido:
                result.message = "Falha na atualização";
                result.error = 43;
            } else {
                // Define a mensagem e o erro de conexão:
                result.message = "Erro na conexão com o banco de dados";
                result.error = 4;
            }
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de deletar um produto do banco de dados:
    async delete(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação do produto:
        try {
            // Executa a deletação do produto
            const deleteproduct = await this.prisma.product.delete({
                where: { id: id },
            });

            // Define a mensagem que foi deletado e os dados:
            result.data = deleteproduct;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }
}

//! Exporta a classe instanciada de serviços:
export default new ProductService();
