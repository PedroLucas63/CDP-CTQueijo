//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

//! Criação da classe de serviços dos sabores:
class FlavorService {
    //* Construção da classe:
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();
    }

    //* Método de criar um novo sabor no banco de dados:
    async create(flavor) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados importantes do sabor:
        let data = flavor.partialData();

        //? Testa a criação do sabor:
        try {
            // Executa o comando de criação de sabor:
            let createFlavor = await this.prisma.flavor.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createFlavor;
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

    //* Método de receber dados de um sabor por meio de chave unica:
    async view(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Sabor encontrado",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização do sabor:
        try {
            // Executa a visualização do sabor
            const flavor = await this.prisma.flavor.findFirst({
                where: { id: id },
            });

            // Verifica se não foi encontrado um sabor:
            if (flavor === null) {
                // Define a mensagem que não foi encontrado:
                result.message = "Sabor não encontrado";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = flavor;
            }
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de receber dados de todos os sabores:
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Sabores encontrados",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os sabores:
            const flavors = await this.prisma.flavor.findMany();

            // Salva os sabores nos dados do resultado:
            result.data = flavors;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de atualizar um sabor no banco de dados:
    async update(flavor) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados que foram modificados:
        let data = flavor.partialData();

        //? Testa a atualização do sabor:
        try {
            // Executa o comando de atualizar o funcionario:
            let updateflavor = await this.prisma.flavor.update({
                data: data,
                where: { id: flavor.id },
            });

            // Dá os dados atualizados:
            result.data = updateflavor;
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

    //* Método de deletar um sabor do banco de dados:
    async delete(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação do sabor:
        try {
            // Executa a deletação do sabor

            const deleteflavor = await this.prisma.flavor.delete({
                where: { id: id },
            });

            // Define a mensagem que foi deletado e os dados:
            result.data = deleteflavor;
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
export default new FlavorService();
