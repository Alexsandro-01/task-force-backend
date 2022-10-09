# Boas vindas ao repositório de back-end do `Task Force`

Backend  de uma aplicação de Todo list para pratiacar Sequelize, Node,  Express, Typescript, POO e deploy no Heroku

> **Note**: O projeto ainda está em desenvolvimento. 

## Requisitos


1. Para criar um novo usuário enviar uma requisição `Post` para o endpoint `/user/create` com essa estrutura, a requisição retorna um token do usuário produzido pelo `JWT`.

```JSON
// Request
{
  "name": "Fulano de Tal",
  "email": "fulano@exemple.com",
  "password": "12dh34"
}
```
```JSON
// Response
{
  "name": "Fulano de Tal",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NjA4NDU4OTl9.9B1sDV-UW7wW8x9t9c23en1sahU1BNmGU4y5HBPq-dQ"
}
```

2. Para realizar login, realizar uma requisição `Post` para o endpoint `/user/login` com essa estrutura, a requisição retorna um token do usuário produzido pelo `JWT`.

```JSON
// Request
{
  "email": "fulano@exemple.com",
  "password": "12dh34"
}

```

```JSON
// Response
{
  "name": "Fulano de Tal",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NjA4NDU4OTl9.9B1sDV-UW7wW8x9t9c23en1sahU1BNmGU4y5HBPq-dQ"
}

```

3. Para criar uma nova tarefa, enviar para a rota `/tasks` uma requisição do tipo `Post` com a seguinte estrutura
  * É necessário validação do usuário nessa rota, enviar o token do usuário no `header Authorization` da requisição.

```JSON
  {
    "task": "Alguma tarefa aqui",
    "active": true
  }
```
4. Para editar uma tarefa é necessário enviar uma requisição do tipo `Put` para a rota `/tasks/:id` enviando a estrutura abaixo e o `id` da tarefa nos parâmetros da URL.

  -  É necessário validação do usuário nessa rota, enviar o token do usuário no `header Authorization` da requisição.
  - Pode ser tanto uma edição do corpo da tarefa, quanto mudá-la para o estatus de finalizada, nesse caso mudando o campo `active` para `false`.

```JSON
  {
    "task": "Alguma tarefa Editada aqui",
    "active": true
  }
```
5. Para deletar uma tarefa é necessário enviar uma requisição para a rota `/tasks/:id` enviando o `id` da tarefa nos parâmetros da URL.

  -  É necessário validação do usuário nessa rota, enviar o token do usuário no `header Authorization` da requisição.
