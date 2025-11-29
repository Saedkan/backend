export const tagResolvers = {
  Query: {
    tags: () => [],
    tag: () => null,
  },

  Mutation: {
    createTag: () => null,
    updateTag: () => null,
    deleteTag: () => false,
  },

  Tag: {
    tasks: () => [],
    taskCount: () => 0,
  },
};