//! Importação dos módulos:
//* Módulo base do sabor:
import Flavor from "../entities/Flavor.js";

//* Módulo de serviço do sabor:
import FlavorService from "../services/FlavorService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//* Importa o módulo de arquivos do sistema:
import fs from "fs";

//! Criação da classe de controle dos dados do sabor:
class FlavorController {
    //* Método de criação do sabor:
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

        //? Cria o sabor:
        let flavor = new Flavor();

        //? Recebimento dos dados:
        flavor.productId = Number(body.productId);
        flavor.name = body.name.trim();
        flavor.price = Float(body.price);
        flavor.image = "/images/products/default.png";

        //? Cria o sabor e verifica as mensagens do serviço:
        result = await FlavorService.create(flavor);

        //? Define o status como sucesso na criação:
        let status = 201;

        //? Verifica se o sabor não foi criado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar um sabor pelo id:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Faz o pedido do resultado da pesquisa:
        const result = await FlavorService.view(Number(body.id));

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o sabor não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar todos os sabores:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os sabors:
        const result = await FlavorService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os sabores não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de atualizar um sabor:
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
                    "./public/images/products/" + Date.now() + image.name;

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
                const { data } = await FlavorService.view(Number(req.body.id));

                // Recebe o local da imagem salva:
                let imageSaved = data.image;

                // Verifica se não é a imagem padrão:
                if (imageSaved !== "/images/products/default.png") {
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

        //? Cria o sabor com os dados:
        let flavor = new Flavor(
            Number(body.id),
            body.productId,
            body.name.trim(),
            Float(body.price),
            localImage
        );

        //? Atualiza o sabor e verifica as mensagens do serviço:
        result = await FlavorService.update(flavor);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o sabor não foi editado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar um sabor:
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

        //? Recebe o identificador do sabor e o nome para o e-mail para verificação:
        const id = Number(body.id);

        //? Se tiver encontrado, remove o sabor:
        result = await FlavorService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o sabor não foi deletado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos sabores:
export default new FlavorController();
