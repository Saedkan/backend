import { gql } from 'apollo-server-express';

export const unifiedTypeDefs = gql`
  scalar DateTime

  type Query {
    hello: String!
    me: User
    users: [User!]!
    projects: [Project!]!
    tasks: [Task!]!
    searchUsers(query: String!): [User!]!
    user(id: ID!): User
    project(id: ID!): Project
    myProjects: [Project!]!
    task(id: ID!): Task
    myTasks(status: TaskStatus, priority: TaskPriority, page: Int, limit: Int): TaskConnection!
    overdueTasks(projectId: ID): [Task!]!
    searchTasks(projectId: ID!, query: String!): [Task!]!
    tags(projectId: ID!): [Tag!]!
    tag(id: ID!): Tag
    comments(taskId: ID!): [Comment!]!
    comment(id: ID!): Comment
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateProfile(input: UpdateUserInput!): User!
    deactivateUser: Boolean!
    changeUserRole(userId: ID!, role: UserRole!): User!
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    restoreProject(id: ID!): Project!
    addProjectMember(projectId: ID!, userId: ID!): Project!
    removeProjectMember(projectId: ID!, userId: ID!): Project!
    leaveProject(projectId: ID!): Boolean!
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
    restoreTask(id: ID!): Task!
    assignTask(taskId: ID!, userId: ID!): Task!
    unassignTask(taskId: ID!): Task!
    changeTaskStatus(taskId: ID!, status: TaskStatus!): Task!
    changeTaskPriority(taskId: ID!, priority: TaskPriority!): Task!
    addTagToTask(taskId: ID!, tagId: ID!): Task!
    removeTagFromTask(taskId: ID!, tagId: ID!): Task!
    createTag(input: CreateTagInput!): Tag!
    updateTag(id: ID!, input: UpdateTagInput!): Tag!
    deleteTag(id: ID!): Boolean!
    addComment(input: AddCommentInput!): Comment!
    updateComment(id: ID!, input: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Boolean!
    restoreComment(id: ID!): Comment!
  }

  type Subscription {
    projectUpdated: ProjectUpdatePayload!
    taskUpdated(projectId: ID!): TaskUpdatePayload!
    commentAdded(taskId: ID!): Comment!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    avatar: String
    role: UserRole!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    projectsLed: [Project!]
    projectsMember: [Project!]
    assignedTasks: [Task!]
    comments: [Comment!]
  }

  type Project {
    _id: ID!
    title: String!
    description: String!
    status: ProjectStatus!
    lead: User!
    members: [User!]!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    tasks: [Task!]!
    tags: [Tag!]!
    taskCount: Int!
    memberCount: Int!
  }

  type Task {
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
    isOverdue: Boolean!
    commentCount: Int!
  }

  type Tag {
    _id: ID!
    name: String!
    color: String!
    project: Project!
    createdAt: DateTime!
    updatedAt: DateTime!
    tasks: [Task!]!
    taskCount: Int!
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    task: Task!
    isDeleted: Boolean!
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

  type TaskConnection {
    tasks: [Task!]!
    pagination: PaginationInfo!
  }

  type ProjectUpdatePayload {
    action: ActionType!
    project: Project!
  }

  type TaskUpdatePayload {
    action: ActionType!
    task: Task!
  }

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

  input UpdateUserInput {
    username: String
    email: String
    avatar: String
  }

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

  input CreateTagInput {
    name: String!
    color: String!
    project: ID!
  }

  input UpdateTagInput {
    name: String
    color: String
  }

  input AddCommentInput {
    content: String!
    task: ID!
  }

  input UpdateCommentInput {
    content: String!
  }

  enum UserRole {
    USER
    ADMIN
  }

  enum ProjectStatus {
    ACTIVE
    ON_HOLD
    COMPLETED
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

  enum ActionType {
    CREATED
    UPDATED
    DELETED
  }
`;