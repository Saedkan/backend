import { gql } from 'apollo-server-express';
export const commentTypeDefs = gql `
  type Comment implements BaseModel {
    _id: ID!
    content: String!
    author: User!
    task: Task!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    # Получить комментарии задачи
    comments(taskId: ID!): [Comment!]!
    
    # Получить комментарий по ID
    comment(id: ID!): Comment
  }

  extend type Mutation {
    # Добавить комментарий
    addComment(input: AddCommentInput!): Comment!
    
    # Обновить комментарий
    updateComment(id: ID!, input: UpdateCommentInput!): Comment!
    
    # Удалить комментарий (soft delete)
    deleteComment(id: ID!): Boolean!
    
    # Восстановить комментарий
    restoreComment(id: ID!): Comment!
  }

  extend type Subscription {
    # Подписка на новые комментарии в задаче
    commentAdded(taskId: ID!): Comment!
  }
`;
