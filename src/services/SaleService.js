//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

/** Classe representando os serviços da venda. */
class SaleService {
    /**
     * Cria os serviços da venda.
     */
    constructor() {
        //? Instanciamento do prisma:
        this.prisma = new PrismaClient();
    }

    /**
     * Cria uma nova venda no banco de dados.
     * @param {Sale} sale - A venda.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (venda criada).
     */
    async create(sale) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados importantes da venda:
        let data = sale.partialData();

        //? Testa a criação da venda:
        try {
            // Executa o comando de criação da venda:
            let createSale = await this.prisma.sale.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createSale;
        } catch (e) {
            console.log(e);
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

    /**
     * Visualiza uma venda do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador da venda.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (venda encontrada).
     */
    async view(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Venda encontrada",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização da venda:
        try {
            // Executa a visualização da venda
            const sale = await this.prisma.sale.findFirst({
                where: { id: id },
                include: {
                    client: true,
                    address: true,
                    orders: true,
                },
            });

            // Verifica se não foi encontrada uma venda:
            if (sale === null) {
                // Define a mensagem que não foi encontrada:
                result.message = "Venda não encontrada";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = sale;
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
     * Visualiza todas as vendas do banco de dados.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (todas as vendas encontradas).
     */
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Vendas encontradas",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todas as vendas:
            const sales = await this.prisma.sale.findMany({
                orderBy: {
                    deliveryAt: "asc",
                },
            });

            // Salva as vendas nos dados do resultado:
            result.data = sales;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    /**
     * Atualiza uma venda do banco de dados.
     * @param {Sale} sale - A venda.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (venda atualizada).
     */
    async update(sale) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizada com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados que foram modificados:
        let data = sale.partialData();

        //? Testa a atualização da venda:
        try {
            // Executa o comando de atualizar a venda:
            let updatesale = await this.prisma.sale.update({
                data: data,
                where: { id: sale.id },
            });

            // Dá os dados atualizados:
            result.data = updatesale;
        } catch (e) {
            // Define a mensagem e o erro de conexão:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    /**
     * Deleta uma venda do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador da venda.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (venda deletada).
     */
    async delete(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação da venda:
        try {
            // Executa a deletação da venda

            const deletesale = await this.prisma.sale.delete({
                where: { id: id },
            });

            // Define a mensagem que foi deletada e os dados:
            result.data = deletesale;
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
export default new SaleService();
