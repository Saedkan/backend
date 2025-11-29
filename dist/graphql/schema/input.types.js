import { gql } from 'apollo-server-express';
export const inputTypeDefs = gql `
  # Аутентификация
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    avatar: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  # Проекты
  input CreateProjectInput {
    title: String!
    description: String!
    status: ProjectStatus
    members: [ID!]
  }

  input UpdateProjectInput {
    title: String
    description: String
    status: ProjectStatus
    members: [ID!]
  }

  # Задачи
  input CreateTaskInput {
    title: String!
    description: String!
    status: TaskStatus
    priority: TaskPriority
    dueDate: DateTime
    project: ID!
    assignee: ID
    tags: [ID!]
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: TaskStatus
    priority: TaskPriority
    dueDate: DateTime
    assignee: ID
    tags: [ID!]
  }

  input TaskFilterInput {
    status: TaskStatus
    priority: TaskPriority
    assigneeId: ID
    tags: [ID!]
    dueDateFrom: DateTime
    dueDateTo: DateTime
  }

  # Теги
  input CreateTagInput {
    name: String!
    color: String!
    project: ID!
  }

  input UpdateTagInput {
    name: String
    color: String
  }

  # Комментарии
  input AddCommentInput {
    content: String!
    task: ID!
  }

  input UpdateCommentInput {
    content: String!
  }

  # Пользователи
  input UpdateUserInput {
    username: String
    email: String
    avatar: String
  }
`;
