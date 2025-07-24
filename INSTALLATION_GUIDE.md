# Guia de Instalação

Este guia detalha os passos necessários para configurar e rodar o sistema de gestão de snacks e bebidas em um ambiente de desenvolvimento.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- Docker e Docker Compose (para o banco de dados PostgreSQL)

## 1. Configuração do Backend

### 1.1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

### 1.2. Configure o Banco de Dados

O sistema usa PostgreSQL como banco de dados. A maneira mais fácil de rodá-lo localmente é com Docker.

1.  Na raiz do projeto, crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

    ```yml
    version: '3.8'
    services:
      postgres:
        image: postgres:13
        container_name: snack-db
        restart: always
        ports:
          - "5432:5432"
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: docker
          POSTGRES_DB: snacks
        volumes:
          - pgdata:/var/lib/postgresql/data
    volumes:
      pgdata:
        driver: local
    ```

2.  Inicie o container do PostgreSQL:

    ```bash
    docker-compose up -d
    ```

### 1.3. Instale as dependências

```bash
npm install
```

### 1.4. Configure as Variáveis de Ambiente

1.  Na raiz do projeto, crie uma cópia do arquivo `.env.example` e renomeie para `.env`.
2.  Preencha as variáveis de ambiente no arquivo `.env`. Os valores padrão para o banco de dados já devem funcionar com a configuração do Docker Compose acima. Você precisará preencher as credenciais do AWS SES se quiser que o envio de e-mail funcione.

    ```env
    DB_USER=postgres
    DB_PASSWORD=docker
    DB_NAME=snacks
    DB_HOST=localhost
    DB_PORT=5432
    APP_SECRET=your-super-secret-key

    AWS_ACCESS_KEY_ID=your-aws-access-key-id
    AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
    AWS_REGION=us-east-1
    MAIL_FROM=noreply@example.com
    ```

### 1.5. Rode as Migrações do Banco de Dados

```bash
npx sequelize-cli db:migrate
```

### 1.6. Inicie o Servidor do Backend

```bash
npm run dev
```

O servidor do backend estará rodando em `http://localhost:3333`.

## 2. Configuração do Frontend (Painel Admin)

### 2.1. Instale as dependências

Navegue até o diretório do painel de administração e instale as dependências.

```bash
cd admin-web
npm install
```

### 2.2. Inicie o Servidor de Desenvolvimento

```bash
npm start
```

O painel de administração estará acessível em `http://localhost:3000`.

## 3. Uso

1.  Acesse o painel de administração em `http://localhost:3000`.
2.  Cadastre um novo usuário administrador através do próprio painel ou via banco de dados.
3.  Configure as credenciais do AWS SES na página de "Configurações" para habilitar o login por OTP.
4.  Use a página "Quiosque" para simular o registro de consumo.
