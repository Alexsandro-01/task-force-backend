# Configuração inicial

Para replicar os exemplos desse conteúdo, vai ser importante mudar duas configurações do seu arquivo `tsconfig.json`.

As descrições abaixo vão assumir que o diretório com o código fonte da nossa implementação, incluindo o setup do sequelize ficam no diretório `src`.

```json
"rootDir": "./src",
```

Os códigos compilados, principalmente o arquivo `database.js` com as credenciais de acesso ao banco para o Sequelize ficam no arquivo gerado pela compilação e vai ser necessário para a execução dos comandos do sequelize-cli já que essa ferramenta não consegue interagir diretamente com o código em TypeScript.

Até por isso que não usaremos o comando npx sequelize-cli init pois ele só gera código em js, e não em ts. Por isso vamos fazer nosso código compilado ficar no diretório build.

```json
"outDir": "./build",
```

Considere um contexto em que ainda não há a implementação de modelos para o banco de dados. Nesse caso, precisaremos fazer a instalação dos seguintes pacotes:

```bash
npm i dotenv sequelize @types/sequelize
```

O que temos que ter em mente aqui é que o processo de gerar e aplicar migrations e seeders com o CLI é independente.
Ou seja, não deve afetar o funcionamento da sua API, contanto, evidentemente, que você não faça referência aos arquivos em **/migrations ou **/seeders diretamente nela, e que você possua o arquivo de configuração em JavaScript (o que veremos mais adiante).
Nesse sentido, faça a instalação do CLI:

```bash
npm i -D mysql2 sequelize-cli
```

Gere também um arquivo `./sequelizerc`. Ele será fundamental para o sequelize-cli, dado que será responsável por guardar as informações dos caminhos onde devem se encontrar seus recursos do DB:

```javascript
const path = require('path');

module.exports = {
  'config': path.resolve(__dirname,'build','database','config', 'database.js'),
  'models-path': path.resolve(__dirname,'build','database','models'),
  'seeders-path': path.resolve(__dirname,'src','database', 'seeders'),
  'migrations-path': path.resolve(__dirname,'src','database', 'migrations'),
};
```

Aqui você deve ter notado que os caminhos de config e models-path apontam para pasta raiz build ao invés de src.
Isso é necessário já que, como dito anteriormente, o CLI não deve conseguir interpretar esses recursos caso sejam em *.ts, sendo portanto necessária a transpilação desses recursos para JS Vanilla.
Nesse caso, a pasta build é referente a pasta configurada em seu tsconfig.json, na propriedade `compilerOptions.outDir`. Em outras palavras, a pasta gerada após a aplicação do tsc.

Os arquivos em seeders-path e migrations-path não sofrerão ação do TS, dado que são em *.js. Portanto podem ficar em src.
Agora rode o comando de inicialização do sequelize:

```bash
npx sequelize-cli init
```

Esse comando deve criar o conjunto de pastas, conforme os caminhos definidos em .sequelizerc, algo como:

```
src
└── database
    ├── migrations
    └── seeders
build
└── database
    ├── config
    │   └── database.js
    └── models
        └── index.js
```

Crie as pastas faltantes `./src/database/config/`, `./src/database/models/` e descarte a pasta `./build/database/` nesse primeiro momento.
Faremos isso pois criaremos nossos próprios arquivos de configuração de modelos em TypeScript.

## Criando o arquivo de configuração e iniciando o banco

Crie um novo arquivo em `./src/database/config/database.ts` (considerando que o build dele deve respeitar o caminho configurado em .sequelizerc), ele será nosso novo arquivo de configuração:

```typescript
import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'books_api',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
}

export = config;
```

Caso o objeto process acuse erro, inclua em sua aplicação o pacote @types/node como dependência de desenvolvimento.

> **Note**: Deixe o arquivo `.env` na raíz do repositório

A exportação do módulo deve ser feita utilizando somente export ao invés de export default ou export const, para que a transpilação o transforme em module.exports. O que é reconhecido pelo sequelize-cli.

O tipo Options, importando da lib sequelize, deve assegurar que os atributos de configuração respeitarão os padrões utilizados no momento da inicialização do Sequelize na API. Faremos essa inicialização adiante.

Até aqui, já temos como inicializar o banco de dados. Contudo, só é possível inicializá-lo após a transpilação do arquivo de configuração.
Para facilitar esse processo, vamos criar um script db:reset em curto-circuito que fará três trabalhos, consecutivamente:
Executar o tsc para gerar a build (gerar o arquivo que precisamos em `build/database/config/database.js`);

Executar o comando `npx sequelize-cli db:drop` (para deletar o banco, caso ele já esteja criado);

Executar o comando `npx sequelize-cli db:create` (para criar o banco novamente).

Adicione ao seu package.json, o script:

```json
{
  // ...
  "scripts": {
    "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create"
  }
  // ...
}
```

Verifique se os dados do banco estão corretos em src/database/config/database.ts (sobretudo se você estiver utilizando arquivos .env) e rode o comando npm run db:reset:

Resetando o banco após a transpilação do arquivo de configuração
Se tudo correr bem, o sequelize-cli deve utilizar o arquivo `build/database/config/database.js` (gerado pelo tsc) para criar o novo banco.

Inicializando o Sequelize na API e criando Modelos

Instanciando o Sequelize

Agora crie um novo arquivo em `./src/database/models/index.ts`. Antes, esse arquivo era gerado automaticamente e já fazia o reconhecimento dos models gerados pelo sequelize-cli.

No nosso caso, esse arquivo servirá única e exclusivamente para gerar e exportar uma nova instância do Sequelize, baseada na configuração anterior (já assegurada pela tipagem):

```typescript
import { Sequelize } from 'sequelize';
import * as config from '../config/database';

export default new Sequelize(config);
```

Essa instância deve ser utilizada pelos nossos modelos a seguir.
A partir daqui, restam fazer manualmente os modelos em TS. As migrations e seeders podem ser feitas com ajuda do sequelize-cli.

Aqui é recomendada a criação de um template para facilitar o processo.
Exemplo de modelo

Para facilitar o exemplo, considere os seguintes arquivos de migration e seed: `./src/database/migrations/20211114192739-create-books.js`

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      isbn: {
        type: Sequelize.STRING(100),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
```

`./src/database/seeders/20211116145440-books.js`

```javascript
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          title: 'Código Limpo',
          price: 125.9,
          author: 'Robert C Martin',
          isbn: '8576082675'
        },
        {
          title: 'Refatoração',
          price: 129.9,
          author: 'Martin Fowler',
          isbn: '8575227246'
        },
        {
          title: 'Padrões de Projetos',
          price: 141.98,
          author: 'Erich Gamma',
          isbn: '8573076100'
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('books', null, {});
  },
};
```

Adicione também ao nosso "curto-circuito", em db:reset no package.json, os comandos npx sequelize-cli db:migrate e npx sequelize-cli db:seed:all, que vão servir para popular nosso banco:

```json
{
  // ...
  "scripts": {
    "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
  }
  // ...
}
```

Se estiver tudo correto, a execução do comando npm run db:reset deve restaurar e popular o banco:

## Restaurando e populando o banco

Os modelos no Sequelize podem ser representados como classes que são a extensão (ou seja, que herdam atributos e métodos) da classe Model da mesma biblioteca.

Para construirmos um modelo Sequelize em TypeScript devemos criar sua classe estendida, inicializá-la e depois exportá-la.
Lembrando que todos os tipos podem ser importados do próprio sequelize:
Crie um arquivo `./src/database/models/BookModel.ts`:

```typescript
import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Books extends Model {
  id!: number;
  title!: string;
  price!: number;
  author!: string;
  isbn!: string;
}

Books.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING(30),
    allowNull: false,
  },
  price: {
    type: DECIMAL(10,2),
    allowNull: false,
  },
  author: {
    type: STRING(100),
    allowNull: false,
  },
  isbn: {
    type: STRING(100),
  },
}, {
  sequelize: db,
  modelName: 'books',
  timestamps: false});

export default Books;
```

Aqui é importante notar três coisas:

Como a classe Books estende a classe Model do sequelize, as únicas propriedades que precisamos declarar nela são seus campos (afirmando a existência destes com !. Saiba mais acessando a documentação oficial.);

Todas as demais, como por exemplo, os métodos **findAll**, **create**, etc, já serão herdados no modelo após sua inicialização.

Diferentemente do _sequelize-cli_, que gera um modelo que usa a função sequelize.define dentro de uma constante para definir os campos, aqui você só precisa inicializar o modelo com .init.

Esse método vai receber basicamente as mesmas configurações do método sequelize.define;

Ainda nesse contexto, você precisará adicionar dois campos especiais nos opcionais da definição do modelo (na segunda chave):

sequelize, que deve receber a instância anterior (db) construída no `index.ts`;

`modelName`, que deve fazer referência ao nome da tabela.

Para validar seu modelo Books, é só importá-lo diretamente, e utilizá-lo como de costume.

Para exemplificar de forma bem simples, crie um arquivo `./src/testModel.ts` com o seguinte conteúdo:

```typescript
import Books from "./database/models/BookModel"

(async () => {

  const books = await Books.findAll({ raw: true });
  console.table(books);
  process.exit(0);

})();
```

Restaure o banco de dados com npm run `db:reset` e rode o arquivo criado com o comando `npx ts-node src/testModel.ts` (instale o ts-node, caso seja solicitado):

## Consumindo o Model

> Dica: Associations

O fluxo de associações também difere um pouco, quando se trata de relações 1:N. Nesse caso, as declarações de associations devem ficar concentradas em uma das entidades da relação:

```typescript
import { Model } from 'sequelize';
import db from '.';

import OtherModel from './OtherModel'; // Nossa outra entidade

class Example extends Model {
  // public <campo>!: <tipo>;
}

Example.init({
  // ... Campos
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Example;
```

Se tudo correr bem, você agora deve conseguir utilizar o Sequelize em suas aplicações com TypeScript sem maiores problemas!