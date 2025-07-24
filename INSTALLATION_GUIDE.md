# Guia de Instalação

Este guia detalha os passos necessários para configurar e rodar o sistema de gestão de snacks e bebidas.

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
(Esta seção permanece a mesma da versão anterior do guia)

#### 1.3. Configure as Variáveis de Ambiente
1.  Na raiz do projeto, crie um arquivo `.env`.
2.  Adicione as seguintes variáveis:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=docker
    DB_NAME=snacks
    APP_SECRET=your-super-secret-key
    ```

#### 1.4. Rode as Migrações
**Importante**: Antes de rodar as migrações, o backend precisa ter se conectado ao banco pelo menos uma vez. Inicie o servidor, deixe-o conectar, e então rode as migrações.

```bash
npx sequelize-cli db:migrate
```

#### 1.5. Crie o primeiro usuário (via `psql` ou outra ferramenta)
```sql
INSERT INTO users (name, email, role, created_at, updated_at) VALUES ('Admin', 'admin@example.com', 'admin', NOW(), NOW());
```

#### 1.6. Crie o arquivo de "trava"
Crie um arquivo vazio chamado `setup.lock` dentro do diretório `src/config/`.
```bash
touch src/config/setup.lock
```

### 2. Configuração do Frontend
(Esta seção permanece a mesma da versão anterior do guia)

