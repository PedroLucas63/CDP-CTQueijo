//! Exportação dos módulos:
//* Módulo do cliente prisma:
import { PrismaClient } from "@prisma/client";

//* Módulo do bcrypt:
import bcrypt from "bcrypt";

//! Criação da classe de serviços do funcionario:
class EmployeeService {
    //* Construção da classe:
    constructor() {
        //? Instânciamento do prisma:
        this.prisma = new PrismaClient();

        //? Definição da quantidade de saltos de criptografia:
        this.salts = 10;
    }

    //* Método de criar um novo funcionário no banco de dados:
    async create(employee) {
        //? Realização da criptografia da senha:
        employee.password = bcrypt.hashSync(employee.password, this.salts);

        //? Recebe os dados importantes do empregado:
        let data = employee.partialData();

        //? Objeto JSON com dados do resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Testa a criação do funcionário:
        try {
            // Executa o comando de criação o funcionario:
            let createEmployee = await this.prisma.employee.create({
                data: data,
            });

            // Dá a mensagem da execução e os dados:
            result.message = "Criado com sucesso";
            result.data = createEmployee;
        } catch (e) {
            // Verifica se é um tipo de erro conhecido:
            if (e.code === "P2002") {
                // Dá a mensagem e o erro da execução:
                result.message = "Falha na criação";
                result.error = "Chave única em uso";
            }
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de receber dados de um funcionário por meio de chave unica:
    async view(uniqueValues) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: null,
            error: null,
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
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.message = "Funcionário encontrado";
                result.data = employee;
            }
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = e;
        }
        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de receber dados de todos os funcionários:
    async viewAll() {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Tenta fazer a pesquisa por meio do prisma:
        try {
            // Recebe os dados de todos os funcionários:
            const employees = await this.prisma.employee.findMany();

            // Verifica se a lista não está vazia:
            if (employees.length === 0) {
                // Define a mensagem que não foi encontrado:
                result.message = "Nenhum funcionário encontrado";
            } else {
                // Define a mensagem e os dados que foram encontrados:
                result.message = "Funcionários encontrados";
                result.data = employees;
            }
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = e.code;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }

    //* Método de atualizar um funcionário no banco de dados:
    async update(employee) {
        //? Verifica se a senha foi modificada e faz a criptografia:
        if (!(employee.password === "")) {
            employee.password = bcrypt.hashSync(employee.password, this.salts);
        }

        //? Recebe os dados que foram modificados:
        let data = employee.partialData();

        //? Objeto JSON com dados do resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Testa a atualização do funcionário:
        try {
            // Executa o comando de atualizar o funcionario:
            let updateEmployee = await this.prisma.employee.update({
                data: data,
                where: { id: employee.id },
            });

            // Dá a mensagem da execução e os dados atualizados:
            result.message = "Atualizado com sucesso";
            result.data = updateEmployee;
        } catch (e) {
            // Verifica se é um tipo de erro conhecido:
            if (e.code === "P2002") {
                // Dá a mensagem e o erro da execução:
                result.message = "Falha na atualização";
                result.error = "Chave única em uso";
            }
            console.log(e.code)
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de deletar um funcionário do banco de dados:
    async delete(uniqueValues) {
        //? Objeto com o resultado da pesquisa:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Tenta fazer a deletação do funcionário:
        try {
            // Executa a deletação do funcionário
            const deleteEmployee = await this.prisma.employee.deleteMany({
                where: uniqueValues,
            });
            
            // Define a mensagem que foi deletado e os dados:
            result.message = "Deletado com sucesso";
            result.data = deleteEmployee;
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Erro na conexão com o banco de dados";
            result.error = e.code;
        }

        //? Retorna o resultado da pesquisa:
        return result;
    }
}

//! Exporta a classe instanciada de serviços:
export default new EmployeeService();
