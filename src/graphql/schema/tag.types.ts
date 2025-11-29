import { gql } from 'apollo-server-express';

export const tagTypeDefs = gql`
  type Tag implements BaseModel {
    _id: ID!
    name: String!
    color: String!
    project: Project!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    tasks: [Task!]!
    
    # Computed fields
    taskCount: Int!
  }

  extend type Query {
    # Получить все теги проекта
    tags(projectId: ID!): [Tag!]!
    
    # Получить тег по ID
    tag(id: ID!): Tag
  }

  extend type Mutation {
    # Создать тег
    createTag(input: CreateTagInput!): Tag!
    
    # Обновить тег
    updateTag(id: ID!, input: UpdateTagInput!): Tag!
    
    # Удалить тег
    deleteTag(id: ID!): Boolean!
  }
`;