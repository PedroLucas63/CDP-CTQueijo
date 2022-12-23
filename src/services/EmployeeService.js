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
            error: null
        };

        //? Testa a criação do funcionário:
        try {
            // Executa o comando de criação o funcionario:
            await this.prisma.employee.create({ data: data });

            // Dá a mensagem e o erro da execução:
            result.message = "Successfully created";
            result.error = null;
        } catch (e) {
            // Verifica se é um tipo de erro conhecido:
            if (e.code === "P2002") {
                // Dá a mensagem e o erro da execução:
                result.message = "Creation failure";
                result.error = "Unique key in use";
            }
        }

        // Retorna o resultado:
        return result;
    }
}

export default new EmployeeService();
