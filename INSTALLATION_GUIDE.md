# Guia de Instalação

Este guia detalha os passos necessários para configurar e rodar o sistema de gestão de snacks e bebidas.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- Docker e Docker Compose (para o banco de dados PostgreSQL)

## Opção 1: Wizard de Instalação (Recomendado)

A maneira mais fácil de instalar o sistema é através do assistente de instalação via navegador.

1.  **Clone o repositório e instale as dependências iniciais:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    npm install
    cd admin-web
    npm install
    ```
2.  **Inicie os servidores:**
    Em dois terminais separados, inicie o backend e o frontend.
    ```bash
    # Terminal 1 (na raiz do projeto)
    npm run dev

    # Terminal 2 (no diretório admin-web)
    npm start
    ```
3.  **Acesse o Wizard:**
    Abra seu navegador e acesse `http://localhost:3000`. Você será automaticamente redirecionado para o assistente de instalação.
4.  **Siga os Passos:**
    - **Passo 1: Boas-vindas**: Clique em "Iniciar".
    - **Passo 2: Banco de Dados**: Insira as credenciais do seu banco de dados PostgreSQL. O assistente irá testar a conexão antes de salvar.
    - **Passo 3: Conta de Administrador**: Crie a primeira conta de administrador do sistema.
    - **Passo 4: Conclusão**: Finalize a instalação. Você será redirecionado para a tela de login.

## Opção 2: Instalação Manual (Para Desenvolvedores)

### 1. Configuração do Backend

#### 1.1. Clone o repositório e instale as dependências
```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
npm install
```

#### 1.2. Configure o Banco de Dados com Docker
(Esta seção permanece a mesma)

#### 1.3. Configure as Variáveis de Ambiente
(Esta seção permanece a mesma)

#### 1.4. Rode as Migrações
```bash
npx sequelize-cli db:migrate
```

### 2. Configuração do Frontend
```bash
cd admin-web
npm install
```
