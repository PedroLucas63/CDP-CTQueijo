//! Importação dos módulos:
//* Módulo base do produto:
import Product from "../entities/Product.js";

//* Módulo de serviço do produto:
import ProductService from "../services/ProductService.js";

//* Módulo que recebe o resultado da validação:
import { validationResult } from "express-validator";

//* Importa o módulo de arquivos do sistema:
import fs from "fs";

//! Criação da classe de controle dos dados do produto:
class ProductController {
    //* Método de criação do produto:
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
            return res.status(400).redirect("/dashboard");
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
                    "./public/assets/products/" + Date.now() + image.name;

                // Faz o upload da imagem:
                image.mv(localFile, function (e) {
                    // Verifica se aconteceu um erro:
                    if (e) {
                        // Define a mensagem e o erro:
                        result.message = "Falha no upload da imagem";
                        result.error = 17;

                        // Retorna o resultado com o status de falha:
                        return res.status(400).redirect("/dashboard");
                    }
                });

                // Determina o local da imagem:
                localImage = localFile.replace("./public", "");
            }
        }

        //? Recebe o corpo da página:
        const body = req.body;

        //? Cria o produto:
        let product = new Product();

        //? Recebimento dos dados:
        product.name = body.name.trim();
        product.price = Number(body.price);
        if (localImage === "") {
            product.image = "/assets/products/default.png";
        } else {
            product.image = localImage;
        }

        //? Cria o produto e verifica as mensagens do serviço:
        result = await ProductService.create(product);

        //? Define o status como sucesso na criação:
        let status = 201;

        //? Verifica se o produto não foi criado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).redirect("/dashboard");
    }

    //* Método de visualizar um produto pelo id ou email:
    async view(req, res) {
        //? Recebe o corpo da página:
        const body = req.body;

        //? Recebimento dos dados em um JSON:
        const values = {
            id: Number(body.id),
            name: body.name,
        };

        //? Gera o JSON que possui valores que foram definidos:
        const uniqueValues = JSON.parse(JSON.stringify(values), (key, value) =>
            value === undefined || value === "" || value === 0
                ? undefined
                : value
        );

        //? Faz o pedido do resultado da pesquisa:
        const result = await ProductService.view(uniqueValues);

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se o produto não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de visualizar todos os produtos:
    async viewAll(req, res) {
        //? Faz a requisição dos dados de todos os produtos:
        const result = await ProductService.viewAll();

        //? Define o status como sucesso:
        let status = 200;

        //? Verifica se os produtos não foram encontrados:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de atualizar um produto:
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
                    "./public/assets/products/" + Date.now() + image.name;

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
                const { data } = await ProductService.view({
                    id: Number(req.body.id),
                });

                // Recebe o local da imagem salva:
                let imageSaved = data.image;

                // Verifica se não é a imagem padrão:
                if (imageSaved !== "/assets/products/default.png") {
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

        //? Cria o produto com os dados:
        let product = new Product(
            Number(body.id),
            body.name.trim(),
            Number(body.price),
            localImage
        );

        //? Atualiza o produto e verifica as mensagens do serviço:
        result = await ProductService.update(product);

        //? Define o status como sucesso na atualização:
        let status = 201;

        //? Verifica se o produto não foi atualizado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }

    //* Método de deletar um produto:
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

        //? Recebe o identificador do produto e o nome para o e-mail para verificação:
        const id = Number(body.id);

        //? Se tiver encontrado, remove o produto:
        result = await ProductService.delete(id);

        //? Define o status como sucesso na remoção:
        let status = 201;

        //? Verifica se o produto não foi encontrado:
        if (result.error !== 0) {
            // Modifica o status para conflito com recursos no servidor:
            status = 409;
        }

        //? Retorna o resultado:
        return res.status(status).json(result);
    }
}

//! Exporta o controlador dos produtos:
export default new ProductController();
