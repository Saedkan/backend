import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User implements BaseModel {
    _id: ID!
    username: String!
    email: String!
    avatar: String
    role: UserRole!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    projectsLed: [Project!]
    projectsMember: [Project!]
    assignedTasks: [Task!]
    comments: [Comment!]
  }

  enum UserRole {
    USER
    ADMIN
  }

  extend type Query {
    # Получить текущего пользователя
    me: User
    
    # Получить всех пользователей (только для ADMIN)
    users: [User!]!
    
    # Поиск пользователей
    searchUsers(query: String!): [User!]!
    
    # Получить пользователя по ID
    user(id: ID!): User
  }

  extend type Mutation {
    # Регистрация
    register(input: RegisterInput!): AuthPayload!
    
    # Вход
    login(input: LoginInput!): AuthPayload!
    
    # Обновление профиля
    updateProfile(input: UpdateUserInput!): User!
    
    # Деактивация аккаунта
    deactivateUser: Boolean!
    
    # Смена роли (только для ADMIN)
    changeUserRole(userId: ID!, role: UserRole!): User!
  }
`;