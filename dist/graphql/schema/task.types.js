import { gql } from 'apollo-server-express';
export const taskTypeDefs = gql `
  type Task implements BaseModel {
    _id: ID!
    title: String!
    description: String!
    status: TaskStatus!
    priority: TaskPriority!
    dueDate: DateTime
    project: Project!
    assignee: User
    tags: [Tag!]!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Computed fields
    isOverdue: Boolean!
    commentCount: Int!
  }

  enum TaskStatus {
    BACKLOG
    TODO
    IN_PROGRESS
    REVIEW
    DONE
  }

  enum TaskPriority {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  type TaskConnection {
    tasks: [Task!]!
    pagination: PaginationInfo!
  }

  extend type Query {
    # Получить задачи проекта с фильтрацией
    tasks(
      projectId: ID!
      filter: TaskFilterInput
      page: Int = 1
      limit: Int = 10
    ): TaskConnection!
    
    # Получить задачу по ID
    task(id: ID!): Task
    
    # Получить мои задачи (где я назначен)
    myTasks(
      status: TaskStatus
      priority: TaskPriority
      page: Int = 1
      limit: Int = 10
    ): TaskConnection!
    
    # Получить просроченные задачи
    overdueTasks(projectId: ID): [Task!]!
    
    # Поиск задач
    searchTasks(projectId: ID!, query: String!): [Task!]!
  }

  extend type Mutation {
    # Создать задачу
    createTask(input: CreateTaskInput!): Task!
    
    # Обновить задачу
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    
    # Удалить задачу (soft delete)
    deleteTask(id: ID!): Boolean!
    
    # Восстановить задачу
    restoreTask(id: ID!): Task!
    
    # Назначить задачу на пользователя
    assignTask(taskId: ID!, userId: ID!): Task!
    
    # Снять назначение с задачи
    unassignTask(taskId: ID!): Task!
    
    # Изменить статус задачи
    changeTaskStatus(taskId: ID!, status: TaskStatus!): Task!
    
    # Изменить приоритет задачи
    changeTaskPriority(taskId: ID!, priority: TaskPriority!): Task!
    
    # Добавить тег к задаче
    addTagToTask(taskId: ID!, tagId: ID!): Task!
    
    # Удалить тег из задачи
    removeTagFromTask(taskId: ID!, tagId: ID!): Task!
  }

  extend type Subscription {
    # Подписка на обновления задач в проекте
    taskUpdated(projectId: ID!): TaskUpdatePayload!
  }

  type TaskUpdatePayload {
    action: ActionType!
    task: Task!
  }
`;
