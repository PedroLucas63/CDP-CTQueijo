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
            result.user = await this.prisma.employee.create({ data: data });

            // Dá a mensagem da execução:
            result.message = "Successfully created";
        } catch (e) {
            // Verifica se é um tipo de erro conhecido:
            if (e.code === "P2002") {
                // Dá a mensagem e o erro da execução:
                result.message = "Creation failure";
                result.error = "Unique key in use";
            }
        }

        //? Retorna o resultado:
        return result;
    }

    //* Método de visualizar um funcionário por meio de chave unica:
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
                result.message = "No employees found";
            }
            else{
                // Define a mensagem e os dados que foram encontrados:
                result.message = "Employee found";
                result.data = employee;
            }
    
        } catch (e) {
            // Define a mensagem e o erro:
            result.message = "Database connection error";
            result.error = e.code;
        }
        
        //? Retorna o resultado da pesquisa:
        return result;
    }
}

//! Exporta a classe instanciada de serviços:
export default new EmployeeService();
