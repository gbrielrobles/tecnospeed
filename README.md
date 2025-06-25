# TecnSpeed - Sistema de Geração e Envio de Cartas

Sistema completo para geração e envio de cartas bancárias com interface web moderna e backend robusto.

## 🏗️ Arquitetura

- **Backend**: NestJS com TypeScript, Prisma ORM, Redis, BullMQ
- **Frontend**: Vue.js 3 com Vite
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis
- **Monitoramento**: Prometheus + Grafana
- **Containerização**: Docker + Docker Compose

## 📋 Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ 
- Yarn ou npm
- Git

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd tecnospeed
```

### 2. Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```bash
cd backend
cp .env.example .env
```

Configure as seguintes variáveis no arquivo `.env`:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/tecnospeed?schema=public"
POSTGRES_PASSWORD=sua_senha_postgres
POSTGRES_USER=seu_usuario_postgres
POSTGRES_DB=tecnospeed

# Redis
REDIS_PASSWORD=sua_senha_redis
REDIS_URL=redis://:sua_senha_redis@localhost:6379

# Application
PORT=3000
NODE_ENV=development

# External APIs (se necessário)
ZAPIER_WEBHOOK_URL=sua_url_webhook
SMTP_HOST=seu_smtp_host
SMTP_PORT=587
SMTP_USER=seu_email
SMTP_PASS=sua_senha_email
```

### 3. Instalação das dependências

```bash
# Instalar dependências do projeto principal
yarn install

# Instalar dependências do backend e frontend
yarn run install:dependecy
```

### 4. Configuração do banco de dados

```bash
# Iniciar os containers do banco e Redis
cd backend
docker compose up -d tecnospeed-db tecnospeed-cached

# Aguardar alguns segundos para o banco inicializar
sleep 10

# Executar as migrações do Prisma
npx prisma migrate deploy

# Gerar o cliente Prisma
npx prisma generate

# Executar o seed (dados iniciais)
yarn run database:seed
```

### 5. Compilação e execução

```bash
# Voltar para a raiz do projeto
cd ..

# Compilar o backend
cd backend
yarn run build

# Iniciar todos os serviços (desenvolvimento)
cd ..
yarn run start:dev
```

Ou execute separadamente:

```bash
# Terminal 1 - Backend
cd backend
yarn run start:dev

# Terminal 2 - Frontend  
cd frontend
yarn run dev
```

## 🌐 Acessos

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Bull Dashboard**: http://localhost:3000/admin/queues

## 📊 Monitoramento

O sistema inclui monitoramento completo com:

- **Prometheus**: Coleta de métricas
- **Grafana**: Visualização de dashboards
- **Bull Dashboard**: Monitoramento de filas

## 🔧 Scripts Disponíveis

### Projeto Principal
- `yarn install:dependecy`: Instala dependências do backend e frontend
- `yarn start:dev`: Inicia backend e frontend em modo desenvolvimento

### Backend
- `yarn build`: Compila o projeto
- `yarn start`: Inicia em modo produção
- `yarn start:dev`: Inicia em modo desenvolvimento com hot reload
- `yarn database:seed`: Executa o seed do banco de dados

### Frontend
- `yarn dev`: Inicia servidor de desenvolvimento
- `yarn build`: Compila para produção
- `yarn serve`: Preview da build de produção

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais
- `banks`: Bancos cadastrados
- `products`: Produtos bancários
- `product_bank`: Relacionamento entre produtos e bancos
- `client`: Clientes do sistema
- `letter`: Cartas geradas
- `letter_logs`: Logs de envio das cartas

### Enums
- `Cnabs`: CNAB240, CNAB400, CNAB444
- `StatusOfSending`: SENDING, SENT, CANCELED, PENDING, COMPLETED
- `Carrier`: FINNET, NEXXERA

## 🔄 Fluxo de Funcionamento

1. **Criação de Carta**: Frontend envia dados para `/letters`
2. **Validação**: Backend valida dados e gera template
3. **Cache**: Template é armazenado no Redis
4. **Envio**: Carta é enviada para fila BullMQ
5. **Processamento**: Worker processa e envia via Zapier/Email
6. **Logs**: Status é registrado no banco de dados

## 🛠️ Desenvolvimento

### Estrutura do Backend
```
backend/src/
├── core/           # Módulos principais
│   ├── bank/       # Gestão de bancos
│   └── letter/     # Gestão de cartas
├── shared/         # Módulos compartilhados
├── utils/          # Utilitários
└── main.ts         # Ponto de entrada
```

### Estrutura do Frontend
```
frontend/src/
├── components/     # Componentes Vue
├── views/          # Páginas
├── utils/          # Utilitários
├── plugins/        # Plugins Vue
└── main.js         # Ponto de entrada
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**:
   ```bash
   docker compose down
   docker compose up -d tecnospeed-db
   npx prisma migrate deploy
   ```

2. **Erro de Redis**:
   ```bash
   docker compose restart tecnospeed-cached
   ```

3. **Portas em uso**:
   - Verifique se as portas 3000, 5173, 5432, 6379 estão livres
   - Use `docker compose down` para parar todos os containers

4. **Dependências desatualizadas**:
   ```bash
   yarn install
   cd backend && yarn install
   cd ../frontend && yarn install
   ```

## 📝 Logs

Para visualizar logs dos containers:
```bash
# Logs do banco
docker logs postgres-server

# Logs do Redis
docker logs redis-server

# Logs do backend
cd backend && yarn start:dev
```

## 🔒 Segurança

- Todas as senhas devem ser alteradas em produção
- Use HTTPS em produção
- Configure firewalls adequadamente
- Mantenha dependências atualizadas

**TecnSpeed** - Sistema de Geração e Envio de Cartas Bancárias 