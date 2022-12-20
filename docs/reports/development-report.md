# Relatório de Desenvolvimento

O presente arquivo pretende de unificar a pesquisa relacionada com esse projeto. Entre as informações, serão expostos às necessidades dos clientes, os requisitos funcionais e não funcionais e a diagramação para fins de desenvolvimento. Dessa forma, é visado uma maior facilidade na leitura e entendimento de qualquer um dos pontos redigidos.

## Necessidades do Cliente

### Contexto: Controle de Pedidos do CT do Queijo

O CT do Queijo é uma área vinculada ao IFRN campus Currais Novos que possui como finalidade gerir atividades práticas do curso de alimentos. Sendo assim, ele é responsável por produzir determinados alimentos derivados do leite, como queijo, iogurte e doce de leite. A partir do seu desenvolvimento gradual, percebeu-se uma recorrência de alta demanda de pedidos para exportação de merendas para instituições e comunidades, por isso, verificou-se a necessidade de ter uma ferramenta que melhor organizasse a sua produção. Para tal fim, essa aplicação precisa acolher o cliente e coletar informações acerca do pedido, bem como informá-lo acerca da possibilidade de suprir determinada demanda. Portanto, será uma espécie de agendamento que permitirá ao CT do queijo uma melhor organização do prosseguimento, ou não, dos pedidos.

### Acerca do Pedido

O usuário deve acessar a seção de solicitação de pedidos e informar os dados necessários para que o CT do queijo avalie a disponibilidade para a realização. Primeiramente, ele deve selecionar o(s) produto(s) de seu interesse com base nas opções disponíveis no ambiente digital, especificando ainda o(s) tipo(s) e o(s) sabor(es), caso necessário. Posteriormente, o cliente deve informar a quantidade desejada com base nas escolhas anteriores. Após isso, deve haver a definição do prazo almejado pelo solicitante e, também, a especificação, após concluído, se o pedido será retirado diretamente do CT do queijo ou, então, se será necessário a entrega ao destino. A partir disso, caso necessário, deve haver a especificação do endereço que receberá a produção. Adicionalmente, deve ser especificado o horário previsto, pelo cliente, para o usufruto da produção, evitando atrasos no recebimento. Finalizado isso, o usuário deve confirmar a solicitação e aguardar a resposta do sistema.

### Acerca do Sistema

O sistema deve analisar todos os pedidos que foram cadastrados, dando prioridade às solicitações mais antigas, isto é, a listagem deve ser filtrada de forma a contemplar os primeiros pedidos. Para essa finalidade, o gerenciador deve verificar se há condições possíveis para a realização do pedido, como estoque suficiente, funcionários disponíveis, datas úteis e pleno funcionamento dos equipamentos que fazem parte do processo. A partir dessa análise, a aplicação deve retornar com um positivo, se for possível de atender a demanda, e com negativo, caso não seja viável realizar tal produção. Além disso, se a encomenda for recusada, é necessário expor ao cliente a justificativa da impossibilidade da realização a partir dos critérios supracitados. Já se a encomenda for aceita, faz-se preciso agendar para que o estabelecimento faça o acompanhamento contínuo das atividades que precisarão ser realizadas, bem como retornar ao cliente com algum status positivo. Tendo concluído esse procedimento, o usuário da ferramenta deve observar o prosseguimento da encomenda, por meio de categorias como: parado, em andamento, completo.

## Requisitos

Os requisitos levantados concordam com as intenções da organização do Centro Tecnológico do Queijo do IFRN, Campus Currais Novos, que visa aumentar a agilidade no monitoramento dos pedidos realizados. Com isso, a organização terá mais capacidade de atendimento e um conjunto de dados mais robusto para suportar as decisões de produção da instituição. Esses requisitos estão classificados por relevância, com prioridades que variam entre “Desejável” (o sistema funciona de maneira satisfatória sem o requisito específico), “Importante” (o sistema funciona, mas de forma não satisfatória, sem o determinado requisito) e “Essencial” (o sistema necessita de tal requisito para funcionar). Além disso, os requisitos também foram enumerados para uma maior facilitação de identificação na seção de diagramação.

### 1 Requisitos Funcionais

Os seguintes requisitos funcionais foram selecionados para o sistema: 

#### 1.1 Cadastrar, alterar e remover produtos

**Descrição:** O sistema deve permitir o cadastro de produtos. Também deve ser possível alterar os dados cadastrados dos produtos, assim como removê-los.

**Prioridade:** Essencial.

#### 1.2 Visualizar produtos

**Descrição:** O sistema deve permitir a visualização dos produtos do CT-Queijo.

**Prioridade:** Importante.

#### 1.3 Registrar pedidos

**Descrição:** O sistema deve permitir que o cliente escolha os produtos desejados do CT-Queijo, bem como as informações para contato e endereço.

**Prioridade:** Essencial.

#### 1.4 Gerar relatório de pedidos

**Descrição:** O sistema deve ser capaz de gerar um relatório contendo os últimos pedidos em execução.

**Prioridade:** Desejável.

#### 1.5 Visualizar e cadastrar resposta da solicitação dos pedidos

**Descrição:** O sistema deve retornar uma resposta do pedido para o cliente, de acordo com o cadastrado pelo administrador.

**Prioridade:** Essencial.

#### 1.6 Visualizar situação dos pedidos

**Descrição:** O sistema deve organizar cronologicamente os pedidos com suas respectivas situações.

**Prioridade:** Essencial.

#### 1.7 Cadastrar, alterar e remover funcionários

**Descrição:** O sistema deve permitir o cadastro de funcionários com diferentes níveis de permissão. Também deve ser possível alterar os dados cadastrados, assim como removê-los.

**Prioridade:** Desejável.

#### 1.8 Cadastrar, alterar e remover clientes

**Descrição:** O sistema deve permitir o cadastro de clientes. Também deve ser possível alterar os dados cadastrados, assim como removê-los do sistema.

**Prioridade:** Desejável.

#### 1.9 Cadastrar, alterar e remover estoque de produtos

**Descrição:** O sistema deve permitir o cadastro de estoque, assim como alterá-los. 

**Prioridade:** Desejável.

### 2 Requisitos Não Funcionais

Os seguintes requisitos não-funcionais foram selecionados para o sistema: 

#### 2.1 Requisitos do produto

##### 2.1.1 Segurança

###### 2.1.1.1 Autenticação de usuários

**Descrição:** Os funcionários e clientes devem se autenticar com login e senha, previamente cadastrados no sistema, com o objetivo de aumentar a segurança do sistema.

**Categoria:** Confidencialidade.

**Prioridade:** Essencial.

###### 2.1.1.2 Controle de acesso 

**Descrição:** O usuário só poderá acessar as tarefas disponibilizadas para o seu nível de privilégios no sistema. 

**Categoria:** Confidencialidade. 

**Prioridade:** Essencial. 

###### 2.1.1.3 Mesma base de dados para a instituição e para os clientes 

**Descrição:** Os funcionários da instituição e os clientes têm que ter acesso às mesmas informações de maneira consistente, visualizando o mesmo conjunto de dados.

**Categoria:** Consistência.

**Prioridade:** Desejável.

##### 2.1.2 Usabilidade

###### 2.1.2.1 Simplicidade de uso

**Descrição:** A interface do sistema deve ser intuitiva.

**Prioridade:** Essencial.

###### 2.1.2.2 Linguagem simples e clara

**Descrição:** Dispor de objetividade do conteúdo de forma a facilitar o acesso ao fluxo das telas do sistema.

**Prioridade:** Importante.

###### 2.1.2.3 Design simples

**Descrição:** Uso de lógicas de telas e componentes gráficos (“grids”, barras de rolagem, menus) bem estruturados sem a presença de muita complexidade no acesso às informações e redução no número de cliques.

**Prioridade:** Desejável.

###### 2.1.2.4 Acessibilidade

**Descrição:** Uso de técnicas de programação (tags e funções dedicadas) que incluem a acessibilidade e facilitem a utilização de pessoas com deficiência.

**Prioridade:** Desejável.

##### 2.1.3 Desempenho

###### 2.1.3.1 Eficiência do sistema 

**Descrição:** O sistema deve ser rápido e não sofrer travamentos, gerando uma maior produtividade para o seu uso.

**Prioridade:** Importante.

###### 2.1.3.2 Tempo de resposta 

**Descrição:** As páginas do sistema que envolvem carregamento de listas de produtos e pedidos devem ter tempo de carregamento menor que 3 segundos. 

**Prioridade:** Desejável.

#### 2.2 Requisitos de processo

##### 2.2.1 Realização de vendas com agilidade 

**Descrição:** O usuário deve conseguir realizar pedidos através do sistema em uma pequena quantidade de passos, a fim de torná-las mais rápidas. 

**Prioridade:** Essencial. 

##### 2.2.2 Distribuição de pedidos de maneira ótima 

**Descrição:** O sistema deve conseguir alocar os pedidos no sistema e rearranjá-las de forma otimizada, considerando sua situação de resposta e priorizando pedidos mais antigos. 

**Prioridade:** Desejável

##### 2.2.3 Interoperabilidade 

**Descrição:** O sistema deverá ser executável em diferentes plataformas. 

**Prioridade:** Importante

##### 2.2.4 Versão Web 

**Descrição:** Os clientes poderão acessar os itens em estoque via web. 

**Prioridade:** Essencial.

## Diagramação

A partir da análise dos requisitos, em especial os funcionais, foi necessário estabelecer quais deles seriam desenvolvidos considerando o prazo de 2 a 3 semanas de desenvolvimento. Com isso, foram definidos como possíveis os requisitos funcionais: 1.1, 1.2, 1.3, 1.5 e 1.6. Quando se diz respeito aos requisitos não funcionais, todos foram selecionados, visando serem desenvolvidos em paralelo aos requisitos não funcionais. A partir dessas decisões, foi necessário o desenvolvimento de diagramações que dizem respeito a casos de uso e a diagramação do banco de dados.

### Casos de uso

A partir do estudo dedicado aos requerimentos, foi possível separá-los por semelhança. Dessa forma, se fez necessário a construção de dois diagramas de caso de uso. Logo, o desenvolvimento dos dois se deu com base em suas as similaridades com produtos e pedidos.

#### Produtos

Na diagramação da seção de produtos, temos que o cliente (usuário) se relaciona apenas com a possibilidade de visualizar os produtos, tendo o administrador a função de cadastrar, alterar e remover.

![Diagramação de casos de uso dos requisitos relacionados com produtos](/docs/images/products.png)

#### Pedidos

Na diagramação da seção de pedidos, temos que o cliente realiza o cadastro de um pedido e possui a permissão de visualizar a situação e a resposta do mesmo, tendo o administrador a função de cadastrar essa situação e essa resposta.

![Diagramação de casos de uso dos requisitos relacionados com pedidos](/docs/images/orders.png)

### Banco de dados

Ainda de acordo com o estudo presente com os requisitos funcionais, foi necessário o desenvolvimento da estruturação do banco de dados da plataforma. Nela, para fins de facilitação e potencialidade, foram criados cinco tabelas que se relacionam e juntas compõe uma venda. Dessa forma, temos:

![Diagramação do banco de dados com suas relações](/docs/images/database.png)

## Referências

* CAROLINE, Caroline; MELO, Gedson; LIMA, Pedro; ARAÚJO, Willer. **Especificação de Requisitos para Sistema de Gerenciamento de Estoque da Empresa GG Construção**. Orientador: Jaelson Freire Brelaz de Castro. 2017. Dissertação (Bacharelado em Engenharia da Computação e Ciência da Computação) - Universidade Federal de Pernambuco, [S. l.], 2017. Disponível em: https://www.cin.ufpe.br/~if716/projetos/2017-2/Equipe2_2.pdf. Acesso em: 20 dez. 2022.
