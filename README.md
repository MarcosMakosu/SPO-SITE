# Medical Association Website (S.P.O.)

Este é um projeto full-stack (FastAPI + React) desenvolvido para a Sociedade Paraense de Oftalmologia.

## Pré-requisitos

- Python 3.10+
- Node.js 18+ (recomendado usar `yarn`)

## Instalação e Execução Local

Siga os passos abaixo para rodar o projeto no seu computador:

### 1. Clonar o Repositório

```bash
git clone <seu-repositorio-url>
cd <nome-da-pasta>
```

### 2. Configurar o Backend (API)

```bash
cd backend

# (Opcional) Crie um ambiente virtual
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
# Crie um arquivo .env dentro da pasta backend com o seguinte conteúdo:
# SECRET_KEY=sua_chave_secreta_aqui (pode ser qualquer string aleatória)
# CORS_ORIGINS=http://localhost:3000

# Popular o banco de dados (SQLite)
# Certifique-se de estar na raiz do projeto ou ajuste o caminho do script
python ../scripts/seed_doctors.py

# Iniciar o servidor
uvicorn server:app --reload --port 8001
```

O backend estará rodando em `http://localhost:8001`. A documentação da API pode ser vista em `http://localhost:8001/docs`.

### 3. Configurar o Frontend (Interface)

Abra um novo terminal:

```bash
cd frontend

# Instalar dependências
yarn install

# Configurar variáveis de ambiente
# Crie um arquivo .env dentro da pasta frontend com o seguinte conteúdo:
# REACT_APP_BACKEND_URL=http://localhost:8001

# Iniciar o servidor de desenvolvimento
yarn start
```

O site abrirá automaticamente em `http://localhost:3000`.

## Segurança e Arquitetura

- **Backend**: FastAPI com SQLAlchemy (Async) e SQLite.
- **Frontend**: React com TailwindCSS.
- **Autenticação**: JWT (JSON Web Tokens) com hash de senha bcrypt.
- **Uploads**: Armazenamento local com validação de extensão de arquivo.

## Credenciais Padrão

- **Admin Email**: admin@medassoc.com
- **Senha**: admin123
