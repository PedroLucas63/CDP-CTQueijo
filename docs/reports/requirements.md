# Requisitos

Os requisitos levantados concordam com as intenções da organização do Centro Tecnológico do Queijo do IFRN, Campus Currais Novos, que visa aumentar a agilidade no monitoramento dos pedidos realizados. Com isso, a organização terá mais capacidade de atendimento e um conjunto de dados mais robusto para suportar as decisões de produção da instituição. Esses requisitos estão classificados por relevância, com prioridades que variam entre “Desejável” (o sistema funciona de maneira satisfatória sem o requisito específico), “Importante” (o sistema funciona, mas de forma não satisfatória, sem o determinado requisito) e “Essencial” (o sistema necessita de tal requisito para funcionar).

## Requisitos Funcionais

Os seguintes requisitos funcionais foram selecionados para o sistema: 

### Cadastrar, alterar e remover produtos

**Descrição:** O sistema deve permitir o cadastro de produtos. Também deve ser possível alterar os dados cadastrados dos produtos, assim como removê-los.

**Prioridade:** Essencial.

### Visualizar produtos

**Descrição:** O sistema deve permitir a visualização dos produtos do CT-Queijo.

**Prioridade:** Importante.

### Registrar pedidos

**Descrição:** O sistema deve permitir que o cliente escolha os produtos desejados do CT-Queijo, bem como as informações para contato e endereço.

**Prioridade:** Essencial.

### Gerar relatório de pedidos

**Descrição:** O sistema deve ser capaz de gerar um relatório contendo os últimos pedidos em execução.

**Prioridade:** Desejável.

### Visualizar e cadastrar resposta da solicitação dos pedidos

**Descrição:** O sistema deve retornar uma resposta do pedido para o cliente, de acordo com o cadastrado pelo administrador.

**Prioridade:** Essencial.

### Visualizar situação dos pedidos

**Descrição:** O sistema deve organizar cronologicamente os pedidos com suas respectivas situações.

**Prioridade:** Essencial.

### Cadastrar, alterar e remover funcionários

**Descrição:** O sistema deve permitir o cadastro de funcionários com diferentes níveis de permissão. Também deve ser possível alterar os dados cadastrados, assim como removê-los.

**Prioridade:** Desejável.

### Cadastrar, alterar e remover clientes

**Descrição:** O sistema deve permitir o cadastro de clientes. Também deve ser possível alterar os dados cadastrados, assim como removê-los do sistema.

**Prioridade:** Desejável.

### Cadastrar, alterar e remover estoque de produtos

**Descrição:** O sistema deve permitir o cadastro de estoque, assim como alterá-los. 

**Prioridade:** Desejável.

## Requisitos Não Funcionais

Os seguintes requisitos não-funcionais foram selecionados para o sistema: 

### Requisitos do produto

#### Segurança

##### Autenticação de usuários

**Descrição:** Os funcionários e clientes devem se autenticar com login e senha, previamente cadastrados no sistema, com o objetivo de aumentar a segurança do sistema.

**Categoria:** Confidencialidade.

**Prioridade:** Essencial.

##### Controle de acesso 

**Descrição:** O usuário só poderá acessar as tarefas disponibilizadas para o seu nível de privilégios no sistema. 

**Categoria:** Confidencialidade. 

**Prioridade:** Essencial. 

##### Mesma base de dados para a instituição e para os clientes 

**Descrição:** Os funcionários da instituição e os clientes têm que ter acesso às mesmas informações de maneira consistente, visualizando o mesmo conjunto de dados.

**Categoria:** Consistência.

**Prioridade:** Desejável.

#### Usabilidade

##### Simplicidade de uso

**Descrição:** A interface do sistema deve ser intuitiva.

**Prioridade:** Essencial.

##### Linguagem simples e clara

**Descrição:** Dispor de objetividade do conteúdo de forma a facilitar o acesso ao fluxo das telas do sistema.

**Prioridade:** Importante.

##### Design simples

**Descrição:** Uso de lógicas de telas e componentes gráficos (“grids”, barras de rolagem, menus) bem estruturados sem a presença de muita complexidade no acesso às informações e redução no número de cliques.

**Prioridade:** Desejável.

##### Acessibilidade

**Descrição:** Uso de técnicas de programação (tags e funções dedicadas) que incluem a acessibilidade e facilitem a utilização de pessoas com deficiência.

**Prioridade:** Desejável.

#### Desempenho

##### Eficiência do sistema 

**Descrição:** O sistema deve ser rápido e não sofrer travamentos, gerando uma maior produtividade para o seu uso.

**Prioridade:** Importante.

##### Tempo de resposta 

**Descrição:** As páginas do sistema que envolvem carregamento de listas de produtos e pedidos devem ter tempo de carregamento menor que 3 segundos. 

**Prioridade:** Desejável.

### Requisitos de processo

#### Realização de vendas com agilidade 

**Descrição:** O usuário deve conseguir realizar pedidos através do sistema em uma pequena quantidade de passos, a fim de torná-las mais rápidas. 

**Prioridade:** Essencial. 

#### Distribuição de pedidos de maneira ótima 

**Descrição:** O sistema deve conseguir alocar os pedidos no sistema e rearranjá-las de forma otimizada, considerando sua situação de resposta e priorizando pedidos mais antigos. 

**Prioridade:** Desejável

#### Interoperabilidade 

**Descrição:** O sistema deverá ser executável em diferentes plataformas. 

**Prioridade:** Importante

#### Versão Web 

**Descrição:** Os clientes poderão acessar os itens em estoque via web. 

**Prioridade:** Essencial.
