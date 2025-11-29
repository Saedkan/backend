import { gql } from 'apollo-server-express';
export const projectTypeDefs = gql `
  type Project implements BaseModel {
    _id: ID!
    title: String!
    description: String!
    status: ProjectStatus!
    lead: User!
    members: [User!]!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    tasks: [Task!]!
    tags: [Tag!]!
    
    # Computed fields
    taskCount: Int!
    memberCount: Int!
  }

  enum ProjectStatus {
    ACTIVE
    ON_HOLD
    COMPLETED
  }

  type ProjectConnection {
    projects: [Project!]!
    pagination: PaginationInfo!
  }

  extend type Query {
    # Получить все проекты пользователя
    projects(
      status: ProjectStatus
      page: Int = 1
      limit: Int = 10
    ): ProjectConnection!
    
    # Получить проект по ID
    project(id: ID!): Project
    
    # Получить проекты где пользователь является лидом
    myProjects: [Project!]!
  }

  extend type Mutation {
    # Создать проект
    createProject(input: CreateProjectInput!): Project!
    
    # Обновить проект
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    
    # Удалить проект (soft delete)
    deleteProject(id: ID!): Boolean!
    
    # Восстановить проект
    restoreProject(id: ID!): Project!
    
    # Добавить участника в проект
    addProjectMember(projectId: ID!, userId: ID!): Project!
    
    # Удалить участника из проекта
    removeProjectMember(projectId: ID!, userId: ID!): Project!
    
    # Покинуть проект
    leaveProject(projectId: ID!): Boolean!
  }

  extend type Subscription {
    # Подписка на обновления проектов
    projectUpdated: ProjectUpdatePayload!
  }

  type ProjectUpdatePayload {
    action: ActionType!
    project: Project!
  }

  enum ActionType {
    CREATED
    UPDATED
    DELETED
  }
`;
