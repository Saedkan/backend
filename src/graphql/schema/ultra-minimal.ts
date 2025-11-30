import { gql } from 'apollo-server-express';

export const ultraMinimalTypeDefs = gql`
  scalar DateTime

  type Query {
    hello: String!
    me: User
    users: [User!]!
    projects: [Project!]!
    tasks: [Task!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Project {
    _id: ID!
    title: String!
    description: String!
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;