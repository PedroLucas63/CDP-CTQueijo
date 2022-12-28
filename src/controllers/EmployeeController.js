//! Importação dos módulos:
//* Módulo base do funcionário:
import Employee from "../entities/Employee.js";

//* Módulo de serviço do funcionário:
import EmployeeService from "../services/EmployeeService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//* Importa o módulo de arquivos do sistema:
import fs from "fs";

//! Criação da classe de controle dos dados do funcionário:
class EmployeeController {
    //* Método de criação do funcionário:
    async create(req, res) {
        //? Objeto JSON com o resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Recebe o resultado da validação do express:
        const errors = validationResult(req);

        //? Verifica se ocorreram erros na validação:
        if (!errors.isEmpty()) {
            // Define uma mensagem e um erro:
            result.message = "Erro nos dados passados";
            result.error = errors.array();

            // Retorna o resultado com o status de falha:
            return res.status(400).json(result);
        }

        //? Recebe o corpo da página:
        const body = req.body;

        //? Cria o funcionário:
        let employee = new Employee();

        //? Recebimento dos dados:
        employee.name = `${body.firstName} ${body.lastName}`.trim();
        employee.email = body.email;
        employee.password = body.password;
        employee.role = body.role;
        employee.image = "/images/profiles/default.png";

        //? Cria o funcionário e verifica as mensagens do serviço:
        result = await EmployeeService.create(employee);

        //? Define o status como sucesso na criação:
        let status = 201;

        //? Verifica se o funcionário não foi criado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar um funcionário pelo id ou email:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento dos dados em um JSON:
        const values = {
            id: Number(body.id),
            email: body.email,
        };

        //? Gera o JSON que possui valores que foram definidos:
        const uniqueValues = JSON.parse(JSON.stringify(values), (key, value) =>
            value === undefined || value === "" || value === 0 ? undefined : value
        );

        //? Faz o pedido do resultado da pesquisa:
        const result = await EmployeeService.view(uniqueValues);

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o funcionário não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar todos os funcionários:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os funcionários:
        const result = await EmployeeService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os funcionários não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de atualizar um funcionário:
    async update(req, res) {
        //? Objeto JSON com o resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Recebe o resultado da validação do express:
        const errors = validationResult(req);

        //? Verifica se ocorreram erros na validação:
        if (!errors.isEmpty()) {
            // Define uma mensagem e um erro:
            result.message = "Erro nos dados passados";
            result.error = errors.array();

            // Retorna o resultado com o status de falha:
            return res.status(400).json(result);
        }

        //? Recebe os arquivos enviados:
        const files = req.files;

        //? Determina o local de upload:
        let localImage = "";

        //? Verifica se foi enviado um arquivo com o name de image:
        if (files.image) {
            // Cria um array com os tipos de arquivos suportados:
            const mimetypes = ["image/jpeg", "image/png"];

            // Verifica se o arquivo enviado é uma imagem no formato aceito:
            if (mimetypes.indexOf(files.image.mimetype) !== -1) {
                // Define a imagem e o local:
                const image = files.image;
                const localFile =
                    "./public/images/profiles/" + Date.now() + image.name;

                // Faz o upload da imagem:
                image.mv(localFile, function (e) {
                    // Verifica se aconteceu um erro:
                    if (e) {
                        // Define a mensagem e o erro:
                        result.message = "Falha no upload da imagem";
                        result.error = 17;

                        // Retorna o resultado com o status de falha:
                        return res.status(400).json(result);
                    }
                });

                // Determina o local da imagem:
                localImage = localFile.replace("./public", "");

                // Recebe os dados  do usuário:
                const { data } = await EmployeeService.view({
                    id: Number(req.body.id),
                });

                // Recebe o local da imagem salva:
                let imageSaved = data.image;

                // Verifica se não é a imagem padrão:
                if (imageSaved !== "/images/profiles/default.png") {
                    // Edita o nome da imagem
                    imageSaved = imageSaved.replace("/", "./public/");

                    // Executa a função de deletar a imagem:
                    fs.unlink(imageSaved, (e) => {
                        // Verifica se aconteceu um erro:
                        if (e) {
                            // Define a mensagem e o erro:
                            result.message = "Erro em deletar a imagem antiga";
                            result.error = 16;

                            // Retorna o resultado com o status de falha:
                            return res.status(400).json(result);
                        }
                    });
                }
            }
        }

        //? Recebe o corpo da página:
        const body = req.body;

        //? Cria o funcionário com os dados:
        let employee = new Employee(
            Number(body.id),
            `${body.firstName} ${body.lastName}`.trim(),
            body.email,
            body.password,
            body.role,
            localImage
        );

        //? Atualiza o funcionário e verifica as mensagens do serviço:
        result = await EmployeeService.update(employee);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o funcionário não foi editado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar um funcionário:
    async delete(req, res) {
        //? Objeto JSON com o resultado:
        let result = {
            message: null,
            error: null,
            data: null,
        };

        //? Recebe o resultado da validação do express:
        const errors = validationResult(req);

        //? Verifica se ocorreram erros na validação:
        if (!errors.isEmpty()) {
            // Define uma mensagem e um erro:
            result.message = "Erro nos dados passados";
            result.error = errors.array();

            // Retorna o resultado com o status de falha:
            return res.status(400).json(result);
        }

        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebe o identificador do usuário e o nome para o e-mail para verificação:
        const id = Number(body.id);
        const email = body.email;

        //? Se tiver encontrado, remove o funcionário:
        result = await EmployeeService.delete({ id: id, email: email });

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o funcionário não foi deletado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos funcionários:
export default new EmployeeController();
