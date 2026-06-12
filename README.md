# Finance Crypto Frontend

Este projeto é o frontend da aplicação Finance Crypto, uma plataforma voltada para controle de investimentos em criptomoedas. A ideia principal é oferecer uma interface simples para o usuário acompanhar sua carteira, visualizar informações dos ativos e acessar funcionalidades ligadas ao cadastro, login, dashboard e controle financeiro.

O frontend foi desenvolvido com Angular e faz parte de uma aplicação maior, junto com o backend em Spring Boot. Enquanto o backend fica responsável pelas regras de negócio, autenticação, banco de dados e APIs, o frontend é responsável pela parte visual e pela interação do usuário com o sistema.

## Tecnologias utilizadas

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

## Estrutura do projeto

O projeto Angular está dentro da pasta:

```text
finance-cypto
```

A estrutura principal é parecida com esta:

```text
finance-crypto-frontend
├── README.md
└── finance-cypto
    ├── angular.json
    ├── package.json
    ├── package-lock.json
    ├── public
    └── src
        ├── app
        │   ├── layout
        │   ├── screens
        │   ├── services
        │   ├── app.config.ts
        │   ├── app.routes.ts
        │   ├── app.html
        │   ├── app.scss
        │   └── app.ts
        │
        ├── index.html
        ├── main.ts
        └── styles.scss
```

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/C14-INATEL/finance-crypto-frontend.git
```

Depois entre na pasta do projeto:

```bash
cd finance-crypto-frontend
```

Como o projeto Angular está dentro da pasta `finance-cypto`, entre nela também:

```bash
cd finance-cypto
```

## 2. Instalar as dependências

Antes de iniciar o projeto, instale as dependências com:

```bash
npm install
```

Esse comando baixa todas as bibliotecas necessárias para o Angular conseguir rodar corretamente.

## 3. Iniciar o servidor de desenvolvimento

Para rodar o frontend, use:

```bash
npm start
```

ou, se preferir usar o Angular CLI diretamente:

```bash
ng serve
```

Depois que o servidor iniciar, acesse no navegador:

```text
http://localhost:4200
```

O Angular atualiza a aplicação automaticamente quando algum arquivo do projeto é alterado.

## Scripts disponíveis

No arquivo `package.json`, existem alguns comandos importantes:

```bash
npm start
```

Inicia o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão final do projeto para produção.

```bash
npm test
```

Executa os testes do projeto.

```bash
npm run watch
```

Gera o build em modo de observação, recompilando quando houver alterações.

## Integração com o backend

Este frontend deve ser usado junto com o backend da aplicação Finance Crypto.

Normalmente, o backend roda em:

```text
http://localhost:8080
```

E o frontend roda em:

```text
http://localhost:4200
```

A comunicação entre os dois acontece por meio de requisições HTTP. Por exemplo, o frontend pode enviar dados de login para o backend, receber um token JWT e usar esse token para acessar rotas protegidas.

## Funcionalidades esperadas

A aplicação frontend tem como objetivo fornecer telas e componentes para:

* cadastro de usuário;
* login;
* visualização de dashboard;
* acompanhamento de carteira de criptomoedas;
* exibição de gráficos;
* visualização de ranking ou rentabilidade dos ativos;
* comunicação com os endpoints do backend.

## Autenticação

A autenticação da aplicação deve funcionar com JWT.

O fluxo esperado é:

1. o usuário informa login e senha no frontend;
2. o frontend envia esses dados para o backend;
3. o backend valida as informações;
4. o backend retorna um token JWT;
5. o frontend salva esse token;
6. nas próximas requisições protegidas, o frontend envia o token no header.

O formato esperado do header é:

```text
Authorization: Bearer SEU_TOKEN_AQUI
```

## Gráficos

O projeto utiliza bibliotecas como ApexCharts e ng-apexcharts para criação de gráficos. Esses gráficos podem ser usados para mostrar informações como:

* valorização dos ativos;
* distribuição da carteira;
* lucro e prejuízo;
* histórico de investimentos;
* comparação entre criptomoedas.

## Testes

Para rodar os testes do projeto, use:

```bash
npm test
```

Os testes ajudam a verificar se os componentes, serviços e funcionalidades principais continuam funcionando depois de alterações no código.

## Build do projeto

Para gerar a versão de produção, use:

```bash
npm run build
```

Depois disso, os arquivos finais são gerados na pasta de build configurada pelo Angular.

## Possíveis erros ao rodar

### Erro ao usar `ng serve`

Se o comando `ng serve` não funcionar, primeiro tente rodar:

```bash
npm install
```

Depois tente novamente:

```bash
npm start
```

### Erro de versão do Node

Se aparecer erro relacionado à versão do Node.js, verifique a versão instalada com:

```bash
node -v
```

Também confira a versão do npm:

```bash
npm -v
```

Como o projeto usa uma versão recente do Angular, é importante utilizar uma versão atual do Node.js.

### Erro de conexão com o backend

Se o frontend abrir, mas não conseguir buscar dados, verifique se o backend está rodando.

O backend precisa estar iniciado em:

```text
http://localhost:8080
```

Também é importante verificar se as rotas usadas no frontend são as mesmas que existem no backend.

### Erro de CORS

Se aparecer erro de CORS no navegador, significa que o backend está bloqueando requisições vindas do frontend.

Nesse caso, é necessário liberar no backend a origem:

```text
http://localhost:4200
```

## Funcionalidades já presentes ou esperadas no frontend

* Estrutura inicial em Angular;
* Organização por telas, layout e serviços;
* Configuração de rotas;
* Estilização com SCSS;
* Uso de Tailwind CSS;
* Preparação para gráficos com ApexCharts;
* Scripts de desenvolvimento, build e testes;
* Estrutura para integração com o backend.

## Melhorias futuras

Algumas melhorias que ainda podem ser feitas no frontend:

* melhorar as telas de login e cadastro;
* criar validações visuais nos formulários;
* salvar e controlar o token JWT de forma organizada;
* criar interceptador HTTP para enviar o token automaticamente;
* criar proteção de rotas para páginas que exigem login;
* integrar o dashboard com dados reais do backend;
* criar componentes reutilizáveis;
* melhorar responsividade para celular;
* criar tratamento de erros nas requisições;
* criar mensagens de sucesso e erro para o usuário;
* aumentar a cobertura de testes.

## Observação final

Este frontend ainda está em desenvolvimento, mas já possui uma estrutura inicial importante para a aplicação Finance Crypto. A partir dele, é possível evoluir as telas, conectar melhor com o backend e transformar o sistema em uma plataforma mais completa para acompanhamento de investimentos em criptomoedas.