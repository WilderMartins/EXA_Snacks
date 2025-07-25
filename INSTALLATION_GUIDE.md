# Guia de Instalação

Este guia detalha os passos necessários para configurar e rodar o sistema de gestão de snacks e bebidas.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- Docker e Docker Compose (para o banco de dados PostgreSQL)

## Opção 1: Wizard de Instalação (Recomendado)

A maneira mais fácil de instalar o sistema é através do assistente de instalação via navegador.

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```
2.  **Instale as dependências do Backend:**
    Primeiro, instale apenas as dependências do servidor.
    ```bash
    npm install
    ```
3.  **Instale as dependências do Frontend:**
    Depois que o backend estiver completo, instale as dependências do painel de administração.
    ```bash
    cd admin-web
    npm install
    ```

## Testes

Para executar os testes, use o seguinte comando:

```bash
npm test
```

**Nota:** Os testes são executados sequencialmente para evitar problemas de condição de corrida.
4.  **Se a instalação do `admin-web` falhar:**
    Edite o arquivo `admin-web/package.json` e remova as dependências não essenciais (como `recharts`, `react-csv`). Tente o `npm install` novamente. Se funcionar, reinstale as dependências uma a uma:
    ```bash
    # Dentro do diretório admin-web
    npm install react-router-dom
    npm install html5-qrcode
    # etc.
    ```
2.  **Inicie o Banco de Dados:**
    Em um terminal, na raiz do projeto, inicie o contêiner do banco de dados.
    ```bash
    npm run db:start
    ```
3.  **Configure as Variáveis de Ambiente:**
    Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
    ```bash
    cp .env.example .env
    ```
4.  **Rode as Migrações:**
    Antes de iniciar os servidores, rode as migrações para garantir que o banco de dados está atualizado. Se você estiver atualizando de uma versão anterior, este passo é crucial.
    ```bash
    npx sequelize-cli db:migrate
    ```
4.  **Inicie os servidores:**
    Em dois terminais separados, inicie o backend e o frontend.
    ```bash
    # Terminal 1 (na raiz do projeto)
    npm run dev

    # Terminal 2 (no diretório admin-web)
    npm start
    ```
4.  **Acesse o Wizard:**
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

---

## Solução de Problemas

### `npm install` trava ou demora muito

Se o comando `npm install` parecer travado (geralmente na etapa `idealTree`), pode ser um problema com o cache do npm ou com dependências antigas. Para resolver, force uma reinstalação limpa:

1.  **Remova todos os `node_modules`:**
    ```bash
    # Na raiz do projeto
    rm -rf node_modules
    # No diretório do frontend
    rm -rf admin-web/node_modules
    ```

2.  **Limpe o cache do NPM:**
    ```bash
    npm cache clean --force
    ```

3.  **Tente instalar novamente:**
    ```bash
    npm install
    cd admin-web
    npm install
    ```
