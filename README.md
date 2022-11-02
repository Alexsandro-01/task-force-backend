# Boas vindas ao repositório de back-end do `Task Force`

Backend  de uma aplicação de Todo list para praticar Sequelize, Node,  Express, Typescript, POO e CI com Github Actions.

> **Note**: O projeto ainda está em desenvolvimento.

Já estão implementadas as rotas de `Login` e de `criação de tarefas`, assim como seus respectivos testes.
Os próximos passos são implementar as rotas de `criação de usuários` e de `edição de tarefas`, assim como seus respectivos testes.

> **Note**: A documentação das rotas está disponível em um arquivo `.json` na raíz da aplicação com o nome `Task-Force.postman_collection.json`. A coleção foi exportada do Postman.


## Rodando o projeto localmente.

#

> Requisitos:

- Ter git instalado;
- Ter um Mysql instalado ou um container docker;
- Node versão 16;
- Um cliente HTTP como o Postman, por exemplo;
- Configurar o arquivo `.env.example` que está na raíz do projeto e renomeá-lo para `.env` e nele mudar as variáveis de ambiente para as da sua conexão com o Mysql.
- Configurar o arquivo `.jwt.key.example` para `.jwt.key`. Esse arquivo possui a chave usada pelo jwt durante o desenvolvimento e assim você poderá fazer login com os usuários de teste cadastrados no banco de dados.


1. Baixando para sua máquina.
```bash
  git clone git@github.com:Alexsandro-01/task-force-backend.git
```

2. Entando no diretório e instalando as dependências.
```bash
  cd task-force-backend && npm install
```

3. Criando o banco de dados e populando as tabelas com o Sequelize.
```bash
  npm run db:create && npm run db:create
```

4. Rodando os testes.
```bash
  npm test
```

5. Rodando os test coverage.
```bash
  npm run coverage
```

6. Iniciando a aplicação.
```bash
  npm run dev
```
