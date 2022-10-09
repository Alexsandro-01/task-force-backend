1 -  Instalação do Eslint
```bash
  npm i -d eslint
```

2 - Inicialização do Eslint e sequir os passos para o projeto, no meu caso Typescript

```bash
  npm init @eslint/config
```
3 - Criar um arquivo .eslintignore na raíz do projeto para adicionar os diretórios que devem ser ignorados.

4 - Adicionar os plugins necessários, esses foram os necessários nesse projeto (adicionar ao arquivo .eslintrc.json)

```json
  "plugins": ["@typescript-eslint", "sonarjs", "editorconfig", "mocha"],
```

> Ao rodar o comando `npm run eslint .` provavelmente receberá um erro por não ter os plugins instalados, o erro vai sugerir o comando para instalar cada plugin. Sugiro seguir os comandos para instalar cada plugin.

5 - Adicionar a chave abaixo com as rules de regras para o Eslint (adicionar ao arquivo .eslintrc.json)

```json
  "rules": {
      "no-underscore-dangle": "off",
      "no-console": "off",
      "camelcase": "warn",
      "arrow-parens": [2, "always"],
      "quotes": [2, "single"],
      "implicit-arrow-linebreak": "off",
      "consistent-return": "off",
      "no-unused-vars": [
      "error",
      {
          "argsIgnorePattern": "^_",
          "ignoreRestSiblings": true
      }
      ],
      "@typescript-eslint/no-unused-vars": [
          "error",
          {
              "argsIgnorePattern": "^_",
              "ignoreRestSiblings": true
          }
      ],
      "object-curly-newline": "off",
      "max-params": ["error", 4],
      "max-lines": ["error", 250],
      "max-lines-per-function": [
      "error",
      {
          "max": 20,
          "skipBlankLines": true,
          "skipComments": true
      }
      ],
      "max-len": [
      "error",
      100,
      {
          "ignoreComments": true
      }
      ],
      "complexity": ["error", 5],
      "import/no-extraneous-dependencies": ["off"],
      "sonarjs/cognitive-complexity": ["error", 5],
      "sonarjs/no-one-iteration-loop": ["error"],
      "sonarjs/no-identical-expressions": ["error"],
      "sonarjs/no-use-of-empty-return-value": ["error"],
      "sonarjs/no-extra-arguments": ["error"],
      "sonarjs/no-identical-conditions": ["error"],
      "sonarjs/no-collapsible-if": ["error"],
      "sonarjs/no-collection-size-mischeck": ["error"],
      "sonarjs/no-duplicate-string": ["error"],
      "sonarjs/no-duplicated-branches": ["error"],
      "sonarjs/no-identical-functions": ["error"],
      "sonarjs/no-redundant-boolean": ["error"],
      "sonarjs/no-unused-collection": ["error"],
      "sonarjs/no-useless-catch": ["error"],
      "sonarjs/prefer-object-literal": ["error"],
      "sonarjs/prefer-single-boolean-return": ["error"],
      "sonarjs/no-inverted-boolean-check": ["error"],
      "lines-between-class-members": "off",
      "@typescript-eslint/lines-between-class-members": ["off"]
    }
```