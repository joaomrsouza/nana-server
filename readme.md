# Servidor Nana - A Babá Eletrônica

Servidor backend para o sistema embarcado da babá eletrônica "Nana". Este projeto fornece uma API RESTful e interface web para gerenciamento e monitoramento do dispositivo de babá eletrônica.

## Tecnologias

- **Backend**: Node.js com Express e TypeScript
- **Banco de Dados**: MySQL com Sequelize ORM
- **Frontend**: EJS templates com TailwindCSS
- **Validação**: Zod para esquemas de dados
- **Ferramentas**: ESLint, Prettier, PostCSS

## Arquitetura

O projeto segue uma arquitetura MVC com separação clara de responsabilidades:

- **Controllers**: Gerenciam as rotas e lógica de negócio
- **Models**: Definem a estrutura dos dados no banco
- **Views**: Templates EJS para interface web
- **Schemas**: Validação de dados com Zod

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaomrsouza/nana-server.git
   cd nana-server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` com suas configurações:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_NAME=nana_db
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_HOST=localhost
   ```

4. Configure o banco de dados MySQL.

## Uso

### Desenvolvimento

```bash
npm run dev
```

Este comando inicia o servidor em modo desenvolvimento com hot-reload e compilação automática do CSS.

### Produção

```bash
npm run build
npm start
```

### Scripts Disponíveis

- `npm run dev` - Desenvolvimento com watch mode
- `npm run build` - Build para produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Verifica código com ESLint
- `npm run lint:fix` - Corrige problemas automaticamente
- `npm run format` - Formata código com Prettier

## Estrutura do Projeto

```text
src/
├── public/              # Arquivos estáticos
│   ├── css/            # Estilos CSS e TailwindCSS
│   ├── img/            # Imagens e assets
│   └── scripts/        # Scripts client-side
├── server/             # Código do servidor
│   ├── controllers/    # Controllers da API
│   ├── db/            # Configuração e modelos do banco
│   ├── schemas/       # Schemas de validação Zod
│   ├── env.ts         # Validação de variáveis de ambiente
│   └── index.ts       # Ponto de entrada do servidor
└── views/             # Templates EJS
    └── templates/     # Componentes reutilizáveis
```

## Configuração do Banco de Dados

O projeto utiliza MySQL com Sequelize ORM. Certifique-se de ter o MySQL instalado e rodando ou um banco de dados remoto. Configure as credenciais no arquivo `.env`.

## Desenvolvimento

O projeto utiliza TypeScript com configuração de path mapping (`@/*`) para imports mais limpos. O hot-reload está configurado para arquivos TypeScript, JSON e JavaScript.

### Linting e Formatação

- ESLint configurado com regras TypeScript
- Prettier para formatação consistente
- Configuração para commits padronizados com Commitizen
