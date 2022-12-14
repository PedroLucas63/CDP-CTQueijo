//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

//* Módulo do bcrypt:
import bcrypt from "bcrypt";

/** Classe representando os serviços do funcionário. */
class EmployeeService {
    /**
     * Cria os serviços do funcionário.
     */
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();

        //? Definição da quantidade de saltos de criptografia:
        this.salts = 10;
    }

    /**
     * Cria um novo funcionário no banco de dados.
     * @param {Employee} employee - O funcionário.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (funcionário criado).
     */
    async create(employee) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Criado com sucesso",
            error: 0,
            data: null,
        };

        //? Realização da criptografia da senha:
        employee.password = bcrypt.hashSync(employee.password, this.salts);

        //? Recebe os dados importantes do empregado:
        let data = employee.partialData();

        //? Testa a criação do funcionário:
        try {
            // Executa o comando de criação o funcionario:
            let createEmployee = await this.prisma.employee.create({
                data: data,
            });

            // Dá os dados da criação:
            result.data = createEmployee;
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

    /**
     * Visualiza um funcionário do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador do funcionário.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (funcionário encontrado).
     */
    async view(uniqueValues) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Funcionário encontrado",
            error: 0,
            data: null,
        };

        //? Tenta fazer a visualização do funcionário:
        try {
            // Executa a visualização do funcionário
            const employee = await this.prisma.employee.findFirst({
                where: uniqueValues,
            });

            // Verifica se não foi encontrado um funcionário:
            if (employee === null) {
                // Define a mensagem que não foi encontrado:
                result.message = "Funcionário não encontrado";
                result.error = 14;
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.data = employee;
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
     * Visualiza todos os funcionários do banco de dados.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (todos os funcionários encontrados).
     */
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Funcionários encontrados",
            error: 0,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os funcionários:
            const employees = await this.prisma.employee.findMany();

            // Salva os funcionários nos dados do resultado:
            result.data = employees;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = 4;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    /**
     * Atualiza um funcionário do banco de dados.
     * @param {Employee} employee - O funcionário.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (funcionário atualizado).
     */
    async update(employee) {
        //? Objeto JSON com dados do resultado:
        let result = {
            message: "Atualizado com sucesso",
            error: 0,
            data: null,
        };

        //? Verifica se a senha foi modificada e faz a criptografia:
        if (!(employee.password === "")) {
            employee.password = bcrypt.hashSync(employee.password, this.salts);
        }

        //? Recebe os dados que foram modificados:
        let data = employee.partialData();

        //? Testa a atualização do funcionário:
        try {
            // Executa o comando de atualizar o funcionario:
            let updateEmployee = await this.prisma.employee.update({
                data: data,
                where: { id: employee.id },
            });

            // Dá os dados atualizados:
            result.data = updateEmployee;
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

    /**
     * Deleta um funcionário do banco de dados por meio do seu identificador.
     * @param {number} id - O identificador do funcionário.
     * @return {json} O resultado da execução com mensagem, código de erro e dados (funcionário deletado).
     */
    async delete(uniqueValues) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: "Deletado com sucesso",
            error: 0,
            data: null,
        };

        //? Tenta fazer a deletação do funcionário:
        try {
            // Executa a deletação do funcionário
            const deleteEmployee = await this.prisma.employee.deleteMany({
                where: uniqueValues,
            });

            // Define a mensagem que foi deletado e os dados:
            result.data = deleteEmployee;
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
export default new EmployeeService();
