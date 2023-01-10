//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

/** Classe representando os serviços do endereço. */
class AddressService {
    /**
     * Cria os serviços do endereço.
     */
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();
    }

    /**
     * Cria um novo endereço no banco de dados.
     * @param {Address} address - O endereço.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (endereço criado).
     */
    async create(address) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados importantes do endereço:
        let data = address.partialData();

        //? Testa a criação do endereço:
        try {
            // Executa o comando de criação do endereço:
            let createAddress = await this.prisma.address.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createAddress;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    /**
     * Visualiza um endereço do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador do endereço.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (endereço encontrado).
     */
    async view(id) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Endereço encontrado",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização do endereço:
        try {
            // Executa a visualização do endereço
            const address = await this.prisma.address.findFirst({
                where: { id: id },
            });

            // Verifica se não foi encontrado um endereço:
            if (address === null) {
                // Define a mensagem que não foi encontrado:
                result.message = "Endereço não encontrado";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = address;
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
     * Visualiza todos os endereços do banco de dados.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (todos os endereços encontrados).
     */
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Endereços encontrados",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os endereços:
            const adresses = await this.prisma.address.findMany();

            // Salva os endereços nos dados do resultado:
            result.data = adresses;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    /**
     * Atualiza um endereço do banco de dados.
     * @param {Address} address - O endereço.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (endereço atualizado).
     */
    async update(address) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizado com sucesso",
            error: 0,
            data: null,
        };

        //? Recebe os dados que foram modificados:
        let data = address.partialData();

        //? Testa a atualização do endereço:
        try {
            // Executa o comando de atualizar o endereço:
            let updateAddress = await this.prisma.address.update({
                data: data,
                where: { id: address.id },
            });

            // Dá os dados atualizados:
            result.data = updateAddress;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado:
        return result;
    }

    /**
     * Deleta um endereço do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador do endereço.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (endereço deletado).
     */
    async delete(id) {
        //? Objeto com o resultado:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação do endereço:
        try {
            // Executa a deletação do endereço
            const deleteAddress = await this.prisma.address.delete({
                where: { id: id },
            });

            // Define os dados:
            result.data = deleteAddress;
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
export default new AddressService();
