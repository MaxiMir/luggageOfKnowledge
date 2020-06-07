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

  input UserInput {
    name: String!
    email: String!
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

// ! - данный тип обязателен
// users: [User!]! - поле users обязательно массив c User`s
// Подключается в index.js

/*
  query {
    test {
      count
      users {
        name email
      }
    }
  }

  query {
    random(min: 2, max: 12, count: 8)
  }

  mutation {
    addTestUser(user: {name: "Test", email: "test@mail.ru"}) {
      age
    }
  }
*/
