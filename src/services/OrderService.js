//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

//! Criação da classe de serviços do pedido:
class OrderService {
    //* Construção da classe:
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();
    }

    //* Método de criar um novo pedido no banco de dados:
    async create(order) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados importantes do pedido:
        let data = order.partialData();

        //? Testa a criação do pedido:
        try {
            // Executa o comando de criação o pedido:
            let createOrder = await this.prisma.order.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createOrder;
        } catch (e) {
            // Define a mensagem e o erro de conexão:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de receber dados de um pedido por meio de chave unica:
    async view(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Pedido encontrado",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização do pedido:
        try {
            // Executa a visualização do pedido
            const order = await this.prisma.order.findFirst({
                where: { id: id },
            });

            // Verifica se não foi encontrado um pedido:
            if (order === null) {
                // Define a mensagem que não foi encontrado:
                result.message = "Pedido não encontrado";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = order;
            }
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de receber dados de todos os pedidos:
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Pedidos encontrados",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os pedidos:
            const orders = await this.prisma.order.findMany();

            // Salva os pedidos nos dados do resultado:
            result.data = orders;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de atualizar um pedido no banco de dados:
    async update(order) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados que foram modificados:
        let data = order.partialData();

        //? Testa a atualização do pedido:
        try {
            // Executa o comando de atualizar o pedido:
            let updateOrder = await this.prisma.order.update({
                data: data,
                where: { id: order.id },
            });

            // Dá os dados atualizados:
            result.data = updateOrder;
        } catch (e) {
            // Define a mensagem e o erro de conexão:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de deletar um pedido do banco de dados:
    async delete(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação do pedido:
        try {
            // Executa a deletação do pedido
            const deleteOrder = await this.prisma.order.delete({
                where: { id: id },
            });

            // Define os dados:
            result.data = deleteOrder;
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
export default new OrderService();
