const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type User {
    name: String! 
    email: String!
    age: Int!
  }

  type TestType {
    count: Int!
    users: [User!]!
  }

  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    test: TestType!    
    random(min: Int!, max: Int!, count: Int!): [Float!]!
    getTodos: [Todo!]!
  }

  input UserInput {
    name: String!
    email: String!
  }

  input TodoInput {
    title: String!
  }

  type Mutation {
    addTestUser(user: UserInput!): User!
    createTodo(todo: TodoInput!): Todo!
    completeTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`)

// Query - получение данных
// test, random, getTodos - резолверы

// Mutation - изменение данных

// ! - данный тип обязателен
// ID - тип данных в GraphQL
// users: [User!]! - поле users обязательно массив c User`s

/*
// интерфейс /qraphql
  #1:
  query {
    test {
      count
      users {
        name email
      }
    }
  }

  #2:
  query {
    random(min: 2, max: 12, count: 8)
  }

  #3:
  mutation {
    addTestUser(user: {name: "Test", email: "test@mail.ru"}) {
      age
    }
  }
*/

// Подключается в index.js