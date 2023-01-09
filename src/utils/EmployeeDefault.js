//! Importação dos módulos:
//* Módulo de entidade dos funcionários:
import Employee from "../entities/Employee.js";

//* Módulo de serviços dos funcionários:
import EmployeeService from "../services/EmployeeService.js";

//! Função de criar o adminstrador:
async function createAdmin(id, name, email, password, role, image) {
    //* Procura o administrador com os dados fornecidos:
    let result = await EmployeeService.view({ id: Number(id), email: email });
    //* Verifica se foi encontrado:
    if (result.error === 14) {
        //? Cria o funcionário:
        const employee = new Employee(Number(id), name, email, password, role, image);

        //? Faz a tentativa de criação do funcionário:
        result = await EmployeeService.create(employee);

        //? Verifica se criou:
        if (result.error === 0) {
            // Informa que foi criado:
            console.log("Default admin successfully created!");
        }
    }
}

//! Exportação da função:
export default createAdmin;
