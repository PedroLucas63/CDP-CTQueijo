//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

/** Classe representando os serviços do pedido. */
class OrderService {
    /**
     * Cria os serviços do pedido.
     */
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();
    }

    /**
     * Cria um novo pedido no banco de dados.
     * @param {Order} order - O pedido.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (pedido criado).
     */
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

    /**
     * Visualiza um pedido do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador do pedido.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (pedido encontrado).
     */
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

    /**
     * Visualiza todos os pedidos do banco de dados.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (todos os pedidos encontrados).
     */
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

    /**
     * Atualiza um pedido do banco de dados.
     * @param {Order} order - O pedido.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (pedido atualizado).
     */
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

    /**
     * Deleta um pedido do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador do pedido.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (pedido deletado).
     */
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
