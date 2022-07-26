# Requisitos


### 1. Para criar um novo usuário enviar uma requisição `Post` para o endpoint `/user/create` com essa estrutura, a requisição retorna um token do usuário produzido pelo `JWT`.

```JSON
// Body Request
{
  "name": "Fulano de Tal",
  "email": "fulano@exemple.com",
  "password": "12dh34"
}
```
```JSON
// Body Response
{
  "name": "Fulano de Tal",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NjA4NDU4OTl9.9B1sDV-UW7wW8x9t9c23en1sahU1BNmGU4y5HBPq-dQ"
}
```

### 2. Para realizar login, realizar uma requisição `Post` para o endpoint `/user/login` com essa estrutura, a requisição retorna um token do usuário produzido pelo `JWT`.

```JSON
// Body Request
{
  "email": "fulano@exemple.com",
  "password": "12dh34"
}

```

```JSON
// Body Response
{
  "name": "Fulano de Tal",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NjA4NDU4OTl9.9B1sDV-UW7wW8x9t9c23en1sahU1BNmGU4y5HBPq-dQ"
}

```

3. Para criar uma nova tarefa, enviar para a rota `/tasks/create` uma requisição do tipo `Post` com a seguinte estrutura
  * É necessário validação do usuário nessa rota, enviar o token do usuário no `header Authorization` da requisição no formato `Bearer token`.

```JSON
  // Body Request
  {
    "task": "Alguma tarefa aqui",
    "active": true
  }
```

```json
  // Status Response
  204
```
4. Para editar uma tarefa é necessário enviar uma requisição do tipo `Put` para a rota `/tasks/update/1` onde `1` equivale ao `id` da tarefa nos parâmetros da URL.

  -  É necessário validação do usuário nessa rota, enviar o token do usuário no `header Authorization` da requisição no formato `Bearer token`.
  - Pode ser tanto uma edição do corpo da tarefa, quanto mudá-la para o estatus de finalizada, nesse caso mudando o campo `active` para `false`.
  - Não precisa mandar os dois campos, caso for alterar apenas o corpo da tarefa, enviar apenas a `{ "task": "Alguma tarefa Editada aqui" }`, por exemplo.

```JSON
  // Body Request
  {
    "task": "Alguma tarefa Editada aqui",
    "active": true
  }
```

```json
  // Status Response
  204
```
5. Para deletar uma tarefa é necessário enviar uma requisição para a rota `/tasks/:id` enviando o `id` da tarefa nos parâmetros da URL.

  -  É necessário validação do usuário nessa rota, enviar o token do usuário no `header Authorization` da requisição no formato `Bearer token`.
