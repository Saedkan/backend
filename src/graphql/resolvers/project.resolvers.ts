export const projectResolvers = {
  Query: {
    projects: () => [],
    project: () => null,
    myProjects: () => [],
  },

  Mutation: {
    createProject: () => null,
    updateProject: () => null,
    deleteProject: () => false,
    restoreProject: () => null,
    addProjectMember: () => null,
    removeProjectMember: () => null,
    leaveProject: () => false,
  },

  Subscription: {
    projectUpdated: {
      subscribe: () => ({
        [Symbol.asyncIterator]: () => ({
          next: () => Promise.resolve({ value: {}, done: false })
        })
      })
    }
  },

  Project: {
    tasks: () => [],
    tags: () => [],
    taskCount: () => 0,
    memberCount: () => 0,
  },
};