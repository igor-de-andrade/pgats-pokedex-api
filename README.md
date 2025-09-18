# Pokédex API
![Imagem ilustrativa do projeto](./README_ASH.png)

Esta é uma API para gerenciamento de pokémons avistados na pokédex de aventureiros.

## Motivação

Esta API foi desenvolvida por inteligência artificial generativa para ser usada no trabalho de conclusão da disciplina de testes automatizados de API da PGATS (Pós-gradução em automação de testes).

## Instalação

1. Clone o repositório ou copie os arquivos para sua máquina.
2. Instale as dependências:

```
npm install
```

## Executando a API

```
node server.js
```

A API estará disponível em `http://localhost:3000`.

Acesse a documentação Swagger em: `http://localhost:3000/api-docs`

## Endpoints principais

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /pokedex/register` — Registrar pokémon na pokédex (autenticado)
- `GET /pokedex` — Listar pokémons da pokédex do usuário (autenticado)

## Autenticação

Após o login, utilize o token JWT retornado no header `Authorization` para acessar os endpoints da pokedex.

Exemplo:

```
Authorization: Bearer <seu_token_jwt>
```

O token JWT é válido por 1 hora. Não compartilhe seu token.

## Segurança

- As senhas dos usuários são armazenadas de forma encriptada usando bcrypt.
- O login retorna um token JWT seguro, que deve ser usado para autenticação.

## Regras de negócio

- Não é possível registrar usuários duplicados.
- Não é possível registrar o mesmo pokémon duas vezes na pokédex.
- Só é possível registrar pokémons existentes na região de Kanto (1 a 150).
- Apenas usuários autenticados podem registar pokémons na a pokédex.


## API GraphQL

Além da API Rest, este projeto expõe os mesmos serviços via GraphQL usando ApolloServer e Express.

### Instalação e execução

1. Instale as dependências (caso ainda não tenha feito):
	 ```
	 npm install
	 cd graphql
	 npm install
	 ```
2. Execute o servidor GraphQL:
	 ```
	 node graphql/server.js
	 ```
	 O servidor GraphQL estará disponível em `http://localhost:4000/graphql`.

### Principais Queries e Mutations

#### Queries
```graphql
query {
	users { username }
	pokedex { id name }
	me { username }
}
```

#### Mutations
```graphql
mutation {
	register(username: "ash", password: "pikachu")
	login(username: "ash", password: "pikachu")
	addPokemonToPokedex(pokemonId: 25)
	removePokemonFromPokedex(pokemonId: 25)
}
```

> Para mutations que alteram a pokédex, envie o token JWT no header `Authorization`.

### Testes

O arquivo `graphql/app.js` pode ser importado para testes automatizados (ex: Supertest).

---
