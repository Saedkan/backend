import { DateTimeScalar } from '../scalars/DateTime.js';

export const minimalResolvers = {
  DateTime: DateTimeScalar,
  
  Query: {
    hello: () => '🚀 TaskFlow GraphQL API is working!',
    me: () => ({ _id: '1', username: 'test', email: 'test@test.com' }),
    users: () => [],
    projects: () => [],
    tasks: () => [],
    searchUsers: () => [],
    user: () => null,
    project: () => null,
    myProjects: () => [],
    task: () => null,
    myTasks: () => ({ tasks: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } }),
    overdueTasks: () => [],
    searchTasks: () => [],
    tags: () => [],
    tag: () => null,
    comments: () => [],
    comment: () => null,
  },
  
  Mutation: {
    register: () => ({ token: 'test', user: { _id: '1', username: 'test' } }),
    login: () => ({ token: 'test', user: { _id: '1', username: 'test' } }),
    updateProfile: () => ({ _id: '1', username: 'test' }),
    deactivateUser: () => true,
    changeUserRole: () => null,
    createProject: () => null,
    updateProject: () => null,
    deleteProject: () => true,
    restoreProject: () => null,
    addProjectMember: () => null,
    removeProjectMember: () => null,
    leaveProject: () => true,
    createTask: () => null,
    updateTask: () => null,
    deleteTask: () => true,
    restoreTask: () => null,
    assignTask: () => null,
    unassignTask: () => null,
    changeTaskStatus: () => null,
    changeTaskPriority: () => null,
    addTagToTask: () => null,
    removeTagFromTask: () => null,
    createTag: () => null,
    updateTag: () => null,
    deleteTag: () => true,
    addComment: () => null,
    updateComment: () => null,
    deleteComment: () => true,
    restoreComment: () => null,
  },
  
  // Минимальные резолверы для типов
  User: {},
  Project: {},
  Task: {},
  Tag: {},
  Comment: {},
  
  Subscription: {
    projectUpdated: {
      subscribe: () => ({
        [Symbol.asyncIterator]: () => ({
          next: () => Promise.resolve({ value: {}, done: false })
        })
      })
    },
    taskUpdated: {
      subscribe: () => ({
        [Symbol.asyncIterator]: () => ({
          next: () => Promise.resolve({ value: {}, done: false })
        })
      })
    },
    commentAdded: {
      subscribe: () => ({
        [Symbol.asyncIterator]: () => ({
          next: () => Promise.resolve({ value: {}, done: false })
        })
      })
    }
  }
};