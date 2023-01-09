# Controle de Pedidos do Centro Tecnológico do Queijo (CTq)

O seguinte sistema permite com que o CTq gerencie os seus produtos ofertados e assim receba pedidos dos mesmos, destinados a Instituições de Ensino e Organizações não governamentais (ONGs). Dessa forma, a seguinte plataforma pretende otimizar o processo de gerenciamento das ofertas de produtos e de pedidos recebidos pelo centro.

## Funcionalidades

As funcionalidades do projeto buscam otimizar o trabalho do administrador local e dos clientes na execução do registro e manejo de produtos e pedidos.

* [ ] 🏬 Sistema de controle destinado ao administrador.
  + [ ] 🛍 Registro, edição e remoção de produtos com seus respectivos sabores.
  + [ ] 💰 Controle de pedidos e registro da situação dos mesmos.
* [ ] 🏪 Sistema de realização de pedidos destinado ao cliente.
  + [ ] 🛒 Visualização e seleção de produtos para registro de pedidos.
  + [ ] 🔃 Atualização da situação dos pedidos realizados.
* [ ] ℹ Plataforma de informações sobre o CTq para os clientes.

## Instalação

A aplicação deverá ser executada em uma máquina com acesso ao PostgreSQL e com o Node.js instalados. Satisfazendo esses requerimentos, é necessário executar o passo a passo a seguir:

1. O primeiro passo se consiste em entrar na pasta do código para a execução dos demais passos para a execução.

```shell
cd src
```

2. O segundo passo se consiste em copiar as informações do arquivo .env de exemplo para o arquivo que é utilizado pelo sistema. Após isso, **NO ARQUIVO .ENV**, os dados de conexão com o banco de dados, o email e a senha do adminstrador e a chave SHA-256, devem ser definidos pelo usuário.

````shell
echo .example.env > .env
````

1. O terceiro passo está relacionado com a instalação de todos os módulos e bibliotecas utilizados pelo sistema.

````shell
npm install
````

4. O quarto passo está na instalação de forma global do nodemon para uma maior segurança na execução do sistema.

```shell
npm install -g nodemon
```

5. O quinto passo se consiste em criar as tabelas necessárias no banco de dados através do Prisma.

```shell
npm run migrate-db
```

6. Por fim, o sistema pode ser rodado através do node ou nodemon (recomendado):
```shell
nodemon app.js
#or
#node app.js
```

Feito esses passos, o usuário será capaz de visualizar a interface gráfica no endereço e porta determinados ([padrão](localhost:3000)).

## Tecnologias usadas

As tecnologias empregadas no seguinte software se baseiam principalmente em módulos do Node.js empregados em otimizar e potencializar a programação e desenvolvimento no sistema de internet que possui como bases o HTML, CSS e JavaScript.

| Sistema         | Descrição                                                                |
|-----------------|--------------------------------------------------------------------------|
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Biblioteca para trabalho com Hash |
| [cep-promise](https://github.com/BrasilAPI/cep-promise) | Buscador de CEP integrado aos diversos serviços online |
| [cpf-cnpj-validator](https://www.npmjs.com/package/cpf-cnpj-validator) | Biblioteca de validação de CPF e CNPJ |
| [dotenv](https://www.npmjs.com/package/dotenv)          | Sistema que carrega variáveis de arquivos .env                           |
| [ejs](https://ejs.co/)             | Uma linguagem de modelagem incorporada com o JavaScript                  |
| [express-fileupload](https://www.npmjs.com/package/express-fileupload) | Mediador para o upload de arquivos no sistema |
| [express-session](https://www.npmjs.com/package/express-session) | Mediador de sessões para o express                                       |
| [express-validator](https://express-validator.github.io/docs/) | Mediador para validar dados recebidos |
| [express](https://expressjs.com/pt-br/)      | Framework para a construção de sistemas de internet                      |
| [jest](https://jestjs.io/pt-BR/)            | Framework de testes do JavaScript                                        |
| [prisma](https://www.prisma.io/)          | Sistema de gerenciamento de conexões com banco de dados                  |
| [tailwindcss](https://tailwindcss.com/)     | Framework do CSS para personalização por meio de classes pré-construídas |

## Fase de Desenvolvimento

A seguinte versão do projeto do Controle de Pedidos do CTq está na fase de desenvolvimento: 0.75 - Em unificação (front e back) 🔀.

## Direitos

Todos os direitos reservados © Eyshila Buriti, Fernanda Dantas, Jônatas Felipe, Pedro Lucas 2022.
