import { gql } from 'apollo-server-express';

export const baseTypeDefs = gql`
  scalar DateTime

  type Query {
    hello: String!
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }

  interface BaseModel {
    _id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PaginationInfo {
    page: Int!
    limit: Int!
    total: Int!
    pages: Int!
  }
`;