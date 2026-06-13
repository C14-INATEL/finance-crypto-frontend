# Finance Crypto Frontend

Este repositório contém o frontend da aplicação **Finance Crypto**, desenvolvida como parte do Projeto C14 - NP2 da disciplina de Engenharia de Software.

A aplicação tem como objetivo permitir que o usuário acompanhe sua carteira de criptomoedas, visualize informações de mercado, gerencie transações de compra e venda, consulte rankings de ativos, acesse notícias e acompanhe indicadores relacionados ao seu portfólio.

O frontend foi desenvolvido em **Angular** e faz parte de uma aplicação maior, integrada a um backend em Spring Boot. Enquanto o backend é responsável pelas regras de negócio, autenticação, persistência de dados e APIs, o frontend é responsável pela interface visual e pela interação do usuário com o sistema.

---

## Links Importantes

* [Repositório Frontend](https://github.com/C14-INATEL/finance-crypto-frontend)
* [Repositório Backend](https://github.com/Greed2003/finance-crypto-backend)
* [Pipeline CI/CD - CircleCI](https://app.circleci.com/pipelines/github/C14-INATEL/finance-crypto-frontend/28/workflows/a344ab96-cd0d-4d99-96e7-1438916be580/jobs/82)
* [Quadro Kanban / Workspace no Notion](https://app.notion.com/p/C216-projeto-372d1c69a7ac809e8dc2ebc70f97b49d?source=copy_link)
* [site / finance-crypto](https://finance-crypto-frontend.vercel.app/login)

---

## Tecnologias Utilizadas

* Angular
* TypeScript
* HTML
* SCSS
* Tailwind CSS
* RxJS
* ApexCharts
* ng-apexcharts
* Vitest
* npm
* CircleCI
* Vercel

---

## Estrutura do Projeto

O projeto Angular está localizado dentro da pasta:

```bash
finance-cypto
```

Estrutura principal:

```bash
finance-crypto-frontend
├── .circleci
│   └── config.yml
├── finance-cypto
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   └── src
│       ├── app
│       │   ├── layout
│       │   ├── screens
│       │   ├── services
│       │   ├── app.config.ts
│       │   ├── app.routes.ts
│       │   ├── app.html
│       │   ├── app.scss
│       │   └── app.ts
│       ├── index.html
│       ├── main.ts
│       └── styles.scss
└── README.md
```

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/C14-INATEL/finance-crypto-frontend.git
```

### 2. Entrar na pasta do repositório

```bash
cd finance-crypto-frontend
```

### 3. Entrar na pasta do projeto Angular

```bash
cd finance-cypto
```

### 4. Instalar as dependências

```bash
npm install
```

### 5. Executar o projeto

```bash
npm start
```

Ou, se preferir usar o Angular CLI diretamente:

```bash
ng serve
```

Depois acesse no navegador:

```bash
http://localhost:4200
```

---

## Scripts Disponíveis

Os principais scripts do projeto são:

```bash
npm start
```

Inicia o servidor de desenvolvimento Angular.

```bash
npm run build
```

Gera a versão final do projeto para produção.

```bash
npm test
```

Executa os testes automatizados do projeto.

```bash
npm run watch
```

Executa o build em modo de observação, recompilando o projeto quando houver alterações.

---

## Integração com o Backend

O frontend foi desenvolvido para se comunicar com o backend da aplicação Finance Crypto.

Normalmente, o backend roda em:

```bash
http://localhost:8080
```

E o frontend roda em:

```bash
http://localhost:4200
```

A comunicação entre frontend e backend acontece por meio de requisições HTTP. O fluxo principal envolve autenticação, consulta de dados do usuário, carteira, transações, ranking de ativos e informações de criptomoedas.

---

## Rotas do Frontend

As principais rotas da aplicação são:

| Rota             | Tela                                |
| ---------------- | ----------------------------------- |
| `/login`         | Tela de login                       |
| `/signup`        | Tela de cadastro                    |
| `/home`          | Tela principal da carteira          |
| `/dashboard`     | Dashboard de criptomoedas           |
| `/rankingAtivos` | Ranking de ativos                   |
| `/noticias`      | Feed de notícias sobre criptomoedas |
| `/perfil`        | Gerenciamento de perfil             |
| `/logout`        | Redirecionamento para login         |

---

## Funcionalidades

A aplicação possui as seguintes funcionalidades principais:

* Cadastro de usuário.
* Login de usuário.
* Tela inicial com informações da carteira.
* Visualização e ocultação de saldo.
* Compra e venda de ativos por meio de modais.
* Cálculo bidirecional de quantidade e valor nas transações.
* Busca de preços em tempo real pela API CoinGecko.
* Histórico de transações.
* Visualização de dashboard de criptomoedas.
* Exibição de gráficos com ApexCharts/ng-apexcharts.
* Ranking de ativos.
* Feed de notícias sobre criptomoedas.
* Gerenciamento de perfil.
* Funcionamento parcial em modo offline usando `localStorage`.
* Isolamento local dos dados por usuário logado.
* Tratamento de falhas quando backend ou APIs externas estão indisponíveis.
* Preparação para deploy com configuração da Vercel.

---

## Autenticação

A autenticação da aplicação utiliza o fluxo com token JWT.

Fluxo esperado:

1. O usuário informa seus dados na tela de login.
2. O frontend envia os dados para o backend.
3. O backend valida as credenciais.
4. O backend retorna um token JWT.
5. O frontend armazena o token.
6. Nas próximas requisições protegidas, o frontend envia o token no header.

Formato esperado do header:

```bash
Authorization: Bearer SEU_TOKEN_AQUI
```

Além da integração com o backend, o projeto também possui uma estratégia de resiliência local. Em caso de indisponibilidade do backend, alguns dados podem ser mantidos no `localStorage`, permitindo que a aplicação continue funcionando de forma limitada.

---

## Funcionalidade Offline-first

Durante a refatoração do projeto, os serviços `AuthService`, `CryptoService` e `ProfileService` foram ajustados para utilizar o `localStorage` como uma forma de armazenamento local caso o backend esteja indisponível.

Essa estratégia foi adotada para melhorar a resiliência da aplicação e permitir que dados importantes da carteira e do histórico de transações não sejam perdidos durante falhas temporárias de conexão.

Também foi implementado isolamento local por usuário, utilizando o `userId` do usuário logado. Dessa forma, os dados de carteira e transações ficam separados entre diferentes usuários.

---

## Dashboard e Gráficos

O projeto utiliza **ApexCharts** e **ng-apexcharts** para exibir informações visuais relacionadas aos ativos e ao portfólio.

Os gráficos podem ser usados para representar:

* patrimônio líquido;
* rentabilidade;
* divisão de ativos;
* histórico de investimentos;
* comparação entre criptomoedas;
* maior alta e maior queda;
* evolução dos preços dos ativos.

---

## Testes

Para executar os testes do projeto, utilize:

```bash
npm test
```

Os testes automatizados foram utilizados para validar funcionalidades como:

* rotas principais da aplicação;
* tela Home;
* Dashboard;
* modais de compra e venda;
* simulação de `localStorage`;
* tratamento de erro quando a API falha;
* formatação local em português do Brasil.

Os testes ajudam a garantir que as funcionalidades principais continuem funcionando após alterações e refatorações.

---

## CI/CD

O projeto utiliza **CircleCI** como ferramenta de integração contínua, atendendo ao requisito de não utilizar GitHub Actions.

A pipeline possui os seguintes jobs:

| Job                     | Função                                       |
| ----------------------- | -------------------------------------------- |
| `instalar_dependencias` | Instala as dependências do projeto Angular   |
| `rodar_testes`          | Executa os testes unitários com Vitest       |
| `auditoria_seguranca`   | Executa auditoria de pacotes com `npm audit` |
| `build_projeto`         | Gera o build da aplicação Angular            |

Fluxo da pipeline:

1. Instalação das dependências.
2. Execução dos testes automatizados.
3. Auditoria de segurança dos pacotes.
4. Build da aplicação.

Esse processo ajuda a validar o projeto antes da integração das alterações na branch principal.

---

## Deploy

O projeto possui configuração adicionada para deploy na **Vercel**.

Essa configuração prepara a aplicação para publicação em ambiente externo, facilitando a demonstração do frontend durante a defesa e permitindo que a aplicação seja acessada sem depender apenas da execução local.

---

## Metodologia de Desenvolvimento

A metodologia adotada pela equipe foi o **Kanban**.

A escolha do Kanban ocorreu porque o grupo trabalhou de forma assíncrona, com integrantes desenvolvendo tarefas em horários diferentes. O quadro Kanban no Notion permitiu organizar as tarefas, acompanhar o andamento das funcionalidades e visualizar o que estava pendente, em desenvolvimento, em revisão ou concluído.

O Kanban também ajudou a limitar o trabalho em andamento, evitando que muitas tarefas fossem iniciadas ao mesmo tempo sem finalização.

---

## Papéis e Responsabilidades

| Integrante/Usuário                  | Responsabilidade                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| João Ryan dos Santos / `joaoryan`   | Desenvolvimento frontend, dashboard, integração com APIs, refatorações, testes, pipeline e deploy    |
| João Pedro Moreira / `joaopedro998` | Desenvolvimento frontend, Home, carteira dinâmica, histórico de transações, testes e ajustes visuais |
| Igorhcdias                          | Apoio no desenvolvimento do componente de ranking de ativos                                          |
| Greed2003                           | Revisão, merge de Pull Requests, documentação e apoio na organização da entrega                      |

---

## Definition of Ready (DoR)

Uma tarefa era considerada pronta para desenvolvimento quando:

* a funcionalidade estava clara para o grupo;
* os critérios de aceitação estavam definidos;
* o card estava registrado no quadro Kanban;
* o responsável pela tarefa estava definido;
* havia entendimento sobre quais telas, serviços ou componentes seriam alterados.

---

## Definition of Done (DoD)

Uma tarefa era considerada concluída quando:

* o código estava implementado;
* o projeto executava sem erro;
* os testes relacionados eram executados;
* a alteração era enviada por commit;
* a alteração passava por Pull Request;
* a pipeline do CircleCI passava;
* a funcionalidade era integrada à branch principal;
* o comportamento implementado estava de acordo com a história de usuário.

---

## Dinâmica de Desenvolvimento

O desenvolvimento foi organizado por funcionalidades. Cada integrante assumiu partes específicas do sistema e realizou commits conforme as entregas eram concluídas.

O fluxo seguido foi:

1. Escolha da tarefa no quadro Kanban.
2. Desenvolvimento local da funcionalidade.
3. Criação de commits com mensagens relacionadas à alteração.
4. Abertura de Pull Request.
5. Revisão da alteração.
6. Execução da pipeline.
7. Merge na branch `main`.

---

## Fluxo de Branches e Pull Requests

A branch principal do projeto foi a `main`.

As funcionalidades foram desenvolvidas em branches separadas e depois integradas por Pull Requests. Entre as branches e PRs utilizadas, destacam-se:

* `refactoring`
* `deploy`
* `cicd-pipeline`
* `dashboard`
* `ranking`
* `joaoPedro`
* `test`

O repositório possui Pull Requests reais, utilizados para integração das funcionalidades e validação do desenvolvimento.

---

## Métricas do Processo

| Métrica                     | Resultado observado          |
| --------------------------- | ---------------------------- |
| Pull Requests fechados      | 17 PRs                       |
| Issues abertas no GitHub    | 0 issues                     |
| Branch principal            | `main`                       |
| Ferramenta de CI/CD         | CircleCI                     |
| Ferramenta de organização   | Notion Kanban                |
| Gerenciador de dependências | npm                          |
| Testes automatizados        | Vitest / Angular Test Runner |
| Deploy                      | Configuração para Vercel     |

Observação: as tarefas foram organizadas principalmente pelo Notion. Por isso, a rastreabilidade das histórias foi feita com base em Pull Requests, commits, componentes e testes.

---

## Histórias de Usuário

| ID   | História de Usuário                                                                                                                        | Critérios de Aceitação                                                                                                                                                | Prioridade | Status           | Rastreabilidade                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------- | ---------------------------------------------- |
| US01 | Como usuário, eu quero realizar login para acessar minhas informações financeiras com segurança.                                           | **Given** que estou na tela de login, **When** informo credenciais válidas, **Then** sou autenticado e redirecionado para a aplicação.                                | Alta       | Entregue         | PR #12 / `AuthService` / rota `/login`         |
| US02 | Como usuário novo, eu quero criar uma conta para utilizar o sistema de controle financeiro de criptomoedas.                                | **Given** que estou na tela de cadastro, **When** informo meus dados, **Then** minha conta é criada e posso acessar o sistema.                                        | Alta       | Entregue         | PR #12 / `SignupComponent` / rota `/signup`    |
| US03 | Como investidor, eu quero visualizar minha carteira para acompanhar meus ativos de criptomoedas.                                           | **Given** que estou logado, **When** acesso a Home, **Then** vejo minha carteira e informações do meu patrimônio.                                                     | Alta       | Entregue         | PR #14 / componente `Home`                     |
| US04 | Como investidor, eu quero ocultar meu saldo para ter privacidade ao usar o sistema em locais públicos.                                     | **Given** que o saldo está visível, **When** clico no botão de ocultar, **Then** o valor deixa de ser exibido diretamente.                                            | Média      | Entregue         | PR #15 / testes da Home                        |
| US05 | Como usuário, eu quero registrar compras e vendas de ativos para manter meu portfólio atualizado.                                          | **Given** que estou na Home, **When** abro os modais de compra ou venda e informo os dados, **Then** a transação é registrada e a carteira é atualizada.              | Alta       | Entregue         | PR #16 / modais de compra e venda              |
| US06 | Como investidor, eu quero que o sistema calcule automaticamente quantidade e valor das transações para reduzir erros manuais.              | **Given** que estou no modal de compra ou venda, **When** informo quantidade ou valor, **Then** o outro campo é calculado automaticamente com base no preço do ativo. | Alta       | Entregue         | PR #16 / integração CoinGecko                  |
| US07 | Como usuário, eu quero visualizar o histórico de transações para acompanhar compras e vendas realizadas.                                   | **Given** que existem movimentações na carteira, **When** acesso a Home, **Then** vejo uma lista com as transações realizadas.                                        | Média      | Entregue         | PR #14 / histórico de transações               |
| US08 | Como investidor, eu quero acessar um dashboard com gráficos para analisar minha carteira e o mercado.                                      | **Given** que acesso o dashboard, **When** os dados são carregados, **Then** visualizo gráficos e indicadores de criptomoedas.                                        | Alta       | Entregue         | PR #8 e PR #16 / Dashboard / ng-apexcharts     |
| US09 | Como investidor, eu quero visualizar um ranking de ativos para comparar o desempenho das criptomoedas.                                     | **Given** que estou logado, **When** acesso a tela de ranking, **Then** vejo os ativos listados conforme os dados disponíveis.                                        | Média      | Entregue         | PR #3 e PR #13 / `RankingAtivosComponent`      |
| US10 | Como usuário, eu quero acessar notícias sobre criptomoedas para acompanhar informações relevantes do mercado.                              | **Given** que acesso a tela de notícias, **When** o feed é carregado, **Then** vejo notícias relacionadas ao mercado cripto.                                          | Baixa      | Entregue         | PR #11 / `NoticiasComponent`                   |
| US11 | Como usuário, eu quero gerenciar meu perfil para alterar ou excluir meus dados.                                                            | **Given** que estou na tela de perfil, **When** altero ou excluo dados, **Then** o sistema envia a solicitação ao backend ou atualiza os dados locais.                | Média      | Entregue parcial | PR #12 / `ProfileComponent` / `ProfileService` |
| US12 | Como usuário, eu quero que meus dados continuem disponíveis quando o backend estiver indisponível para não perder informações importantes. | **Given** que o backend está fora do ar, **When** acesso dados já salvos, **Then** a aplicação usa o `localStorage` como suporte local.                               | Média      | Entregue         | PR #16 / modo offline-first                    |
| US13 | Como usuário, eu quero que meus dados fiquem separados dos dados de outros usuários para manter privacidade e organização.                 | **Given** que existem múltiplos usuários, **When** um usuário acessa sua conta, **Then** carteira e histórico são carregados com base no `userId` logado.             | Alta       | Entregue         | PR #16 / multi-tenant local                    |
| US14 | Como equipe, queremos ter uma aplicação preparada para deploy para facilitar a apresentação e validação externa do projeto.                | **Given** que o projeto precisa ser demonstrado, **When** a aplicação for enviada para deploy, **Then** a configuração da Vercel permite publicar o frontend.         | Baixa      | Entregue         | PR #17 / configuração Vercel                   |

---

## Refactoring

Durante o desenvolvimento, foram realizadas refatorações importantes para melhorar a organização, a manutenção e a resiliência do projeto.

| Refatoração                              | Motivo                                                                                  | Evidência |
| ---------------------------------------- | --------------------------------------------------------------------------------------- | --------- |
| Refatoração do `AuthService`             | Melhorar autenticação e permitir suporte local em caso de falha no backend              | PR #16    |
| Refatoração do `CryptoService`           | Melhorar organização da comunicação com dados de criptomoedas e suporte ao modo offline | PR #16    |
| Refatoração do `ProfileService`          | Melhorar o gerenciamento de dados do perfil e suporte ao `localStorage`                 | PR #16    |
| Uso de `localStorage` como suporte local | Permitir funcionamento parcial quando o backend estiver indisponível                    | PR #16    |
| Isolamento de dados por `userId`         | Separar carteira e transações por usuário logado                                        | PR #16    |
| Ajustes em arquivos `.spec.ts`           | Testar novos fluxos de modais, `localStorage` e formatação local                        | PR #16    |
| Ajustes de pipeline                      | Validar instalação, testes, auditoria e build                                           | PR #6     |
| Configuração para Vercel                 | Preparar o projeto para deploy                                                          | PR #17    |

Essas refatorações foram importantes para tornar o projeto mais próximo de uma aplicação real, com melhor tratamento de falhas, melhor separação de responsabilidades e maior facilidade de manutenção.

---

## O que Funcionou Bem

* A divisão das tarefas por telas e funcionalidades.
* O uso de Pull Requests para integrar alterações.
* A configuração da pipeline no CircleCI.
* A evolução da Home para uma carteira mais dinâmica.
* A criação de modais de compra e venda.
* A integração com API externa para buscar preços.
* A criação de testes automatizados.
* A refatoração para funcionamento parcial offline.
* A preparação do projeto para deploy.

---

## Bloqueios Encontrados

Durante o desenvolvimento, o grupo encontrou alguns desafios:

* ajustes na configuração da pipeline;
* integração entre frontend e backend;
* tratamento de erros de API;
* organização dos dados no `localStorage`;
* isolamento de dados por usuário logado;
* correção de testes após refatorações;
* ajustes na formatação local em português do Brasil;
* organização das rotas e componentes.

---

## Lições Aprendidas

A principal lição aprendida foi que o projeto precisa ser organizado desde o início, principalmente quando envolve autenticação, integração com backend, testes, pipeline e diferentes telas.

Também ficou claro que commits pequenos, Pull Requests separados e testes automatizados ajudam a encontrar erros mais rápido e facilitam a revisão do código.

Em um próximo projeto, o grupo organizaria melhor as issues desde o começo, vinculando cada história de usuário diretamente a uma issue, PR, teste e commit específico.

---

## Uso de IA

O uso de Inteligência Artificial foi declarado de forma transparente, conforme solicitado na atividade.

### Modelos utilizados

* ChatGPT
* Gemini

### Para que a IA foi utilizada

A IA foi utilizada como apoio em:

* organização do README;
* melhoria da escrita da documentação;
* criação de exemplos de histórias de usuário;
* apoio na estruturação da seção de metodologia;
* auxílio em dúvidas de Angular e TypeScript;
* sugestões de testes unitários;
* apoio para entender erros de pipeline;
* revisão de textos e explicações para a defesa.

### Dinâmica de uso

A IA foi utilizada individualmente pelos integrantes como ferramenta de apoio. As respostas não foram copiadas automaticamente para o projeto. O grupo analisou, ajustou e adaptou as sugestões de acordo com a realidade do sistema.

### Prompts utilizados

| Objetivo     | Prompt utilizado                                                                                                      | Resultado e ação tomada                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Documentação | "Organize esse conteúdo em formato de README.md para um projeto Angular de controle financeiro de criptomoedas."      | Ajustado. A estrutura foi aproveitada, mas o texto foi adaptado ao projeto real.             |
| Testes       | "Crie testes unitários para uma tela Home em Angular com função de ocultar saldo, comprar ativo e vender ativo."      | Ajustado. Os testes foram adaptados para os métodos reais do componente.                     |
| Refatoração  | "Como posso organizar melhor serviços em um projeto Angular para autenticação, perfil e dados de criptomoedas?"       | Ajustado. A sugestão ajudou na organização, mas a implementação final foi feita pela equipe. |
| Pipeline     | "Explique como configurar uma pipeline CircleCI para projeto Angular dentro de uma subpasta."                         | Ajustado. A ideia foi usada como apoio, mas a configuração final foi corrigida manualmente.  |
| README NP2   | "Monte uma seção de metodologia, dinâmica de desenvolvimento, histórias de usuário e uso de IA para o README da NP2." | Ajustado. O conteúdo foi revisado para refletir as evidências reais do repositório.          |

### O que não foi feito por IA

A IA não substituiu o desenvolvimento do projeto. As decisões principais de arquitetura, implementação das telas, integração com backend, configuração final da pipeline, commits, Pull Requests, testes e merges foram feitos pela equipe.

A IA foi usada apenas como ferramenta de apoio para dúvidas, organização textual e revisão.

---

## Possíveis Erros ao Rodar

### Erro ao usar `ng serve`

Se o comando `ng serve` não funcionar, primeiro rode:

```bash
npm install
```

Depois tente novamente:

```bash
npm start
```

### Erro de conexão com o backend

Se o frontend abrir, mas não conseguir buscar dados, verifique se o backend está rodando em:

```bash
http://localhost:8080
```

### Erro de CORS

Se aparecer erro de CORS no navegador, é necessário liberar no backend a origem:

```bash
http://localhost:4200
```

### Erro de versão do Node

Verifique a versão instalada:

```bash
node -v
npm -v
```

Como o projeto utiliza uma versão recente do Angular, é recomendado utilizar uma versão atual do Node.js.

---

## Status do Projeto

O frontend está em desenvolvimento, mas já possui uma estrutura funcional com autenticação, carteira, dashboard, ranking, notícias, perfil, testes automatizados, pipeline CI/CD e preparação para deploy.

O projeto evoluiu ao longo das Pull Requests, principalmente com a criação das telas, integração com serviços, refatoração para modo offline, melhorias nos testes e organização da entrega da NP2.
