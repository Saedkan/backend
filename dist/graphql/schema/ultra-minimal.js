import { gql } from 'apollo-server-express';
export const ultraMinimalTypeDefs = gql `
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

  type Comment {
    _id: ID!
    content: String!
    author: User!
    task: Task!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
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

  type AuthPayload {
    token: String!
    user: User!
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
`;
