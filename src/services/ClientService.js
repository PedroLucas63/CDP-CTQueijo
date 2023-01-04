//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

//! Criação da classe de serviços do cliente:
class ClientService {
    //* Construção da classe:
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();
    }

    //* Método de criar um novo cliente no banco de dados:
    async create(client) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados importantes do cliente:
        let data = client.partialData();

        //? Testa a criação do cliente:
        try {
            // Executa o comando de criação o cliente:
            let createClient = await this.prisma.client.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createClient;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de receber dados de um cliente por meio de chave unica:
    async view(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Cliente encontrado",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização do cliente:
        try {
            // Executa a visualização do cliente
            const client = await this.prisma.client.findFirst({
                where: { id: id },
            });

            // Verifica se não foi encontrado um cliente:
            if (client === null) {
                // Define a mensagem que não foi encontrado:
                result.message = "Cliente não encontrado";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = client;
            }
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de receber dados de todos os clientes:
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "clientes encontrados",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os clientes:
            const clients = await this.prisma.client.findMany();

            // Salva os clientes nos dados do resultado:
            result.data = clients;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de atualizar um cliente no banco de dados:
    async update(client) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados que foram modificados:
        let data = client.partialData();

        //? Testa a atualização do cliente:
        try {
            // Executa o comando de atualizar o cliente:
            let updateClient = await this.prisma.client.update({
                data: data,
                where: { id: client.id },
            });

            // Dá os dados atualizados:
            result.data = updateClient;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de deletar um cliente do banco de dados:
    async delete(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação do cliente:
        try {
            // Executa a deletação do cliente
            const deleteClient = await this.prisma.client.delete({
                where: { id: id },
            });

            // Define a mensagem que foi deletado e os dados:
            result.data = deleteClient;
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
export default new ClientService();
